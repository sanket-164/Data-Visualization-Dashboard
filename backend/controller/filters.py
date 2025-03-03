from model.Data import Data
from config import db
from sqlalchemy import or_, and_
import pandas as pd


def get_unique_filters():
    filters = {
        "end_year": [
            row[0] for row in db.session.query(Data.end_year).distinct().all() if row[0]
        ],
        "topic": [
            row[0] for row in db.session.query(Data.topic).distinct().all() if row[0]
        ],
        "sector": [
            row[0] for row in db.session.query(Data.sector).distinct().all() if row[0]
        ],
        "region": [
            row[0] for row in db.session.query(Data.region).distinct().all() if row[0]
        ],
        "pestle": [
            row[0] for row in db.session.query(Data.pestle).distinct().all() if row[0]
        ],
        "source": [
            row[0] for row in db.session.query(Data.source).distinct().all() if row[0]
        ],
        "country": [
            row[0] for row in db.session.query(Data.country).distinct().all() if row[0]
        ],
    }

    return filters


def get_stats(df):
    stats = {
        "num_datapoints": len(df),
        "avg_intensity": df["intensity"].mean().round(2),
        "avg_relevance": df["relevance"].mean().round(2),
        "avg_likelihood": df["likelihood"].mean().round(2),
    }
    
    return stats


def get_monthly_intensity(df):
    # Month mapping dictionary
    month_mapping = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    }

    # Step 1: Sum intensity per month
    monthly_intensity = df.groupby("published_month")["intensity"].mean().reset_index()

    # Step 2: Convert month numbers to month names
    monthly_intensity["published_month"] = monthly_intensity["published_month"].map(
        month_mapping
    )
    monthly_intensity["intensity"] = monthly_intensity["intensity"].round(1)

    # Step 3: Rename columns
    monthly_intensity.rename(columns={"published_month": "month"}, inplace=True)

    # Step 4: Convert to JSON format
    monthly_intensity = monthly_intensity.to_dict(orient="records")

    return monthly_intensity


def get_yearly_intensity(df):

    # Step 1: Sum intensity per month
    yearly_intensity = df.groupby("published_year")["intensity"].mean().reset_index()

    # Step 2: Convert month numbers to month names
    yearly_intensity["published_year"] = yearly_intensity["published_year"]
    yearly_intensity["intensity"] = yearly_intensity["intensity"].round(1)

    # Step 3: Rename columns
    yearly_intensity.rename(columns={"published_year": "year"}, inplace=True)

    # Step 4: Convert to JSON format
    yearly_intensity = yearly_intensity.to_dict(orient="records")

    return yearly_intensity


def get_intensity_relevance(df):
    # Step 1: Calculate the average intensity and relevance for each sector
    sector_stats = (
        df.groupby("sector")
        .agg({"intensity": "mean", "relevance": "mean"})
        .reset_index()
    )

    # Step 2: Round the values
    sector_stats["intensity"] = sector_stats["intensity"].round(1)
    sector_stats["relevance"] = sector_stats["relevance"].round(1)

    # Step 3: Convert to JSON format
    intenssity_relevance = sector_stats.to_dict(orient="records")

    return intenssity_relevance


def get_pestle_likelihood(df):
    # Step 1: Calculate the average likelihood for each topic
    pestle_likelihood = df.groupby("pestle")["likelihood"].mean().reset_index()
    pestle_likelihood = pestle_likelihood.round(2)

    # Step 2: Convert to JSON format
    pestle_likelihood = pestle_likelihood.to_dict(orient="records")

    return pestle_likelihood


def get_region_distribution(df):
    # Step 1: Count occurrences of each region
    region_counts = df["region"].value_counts().reset_index()

    # Step 2: Rename columns for clarity
    region_counts.columns = ["region", "value"]

    # Step 3: Convert to JSON format
    region_distribution = region_counts.to_dict(orient="records")

    return region_distribution


def get_topic_trends(df):
    # Step 1: Count occurrences of each topic per end_year
    topic_counts = df.groupby(["end_year", "topic"]).size().unstack(fill_value=0)

    # Step 2: Reset index to make 'end_year' a column
    topic_counts = topic_counts.reset_index()

    # Step 3: Rename the 'end_year' column to 'year'
    topic_counts.rename(columns={"end_year": "year"}, inplace=True)

    # Step 4: Convert to JSON format (list of dictionaries)
    topic_trends = topic_counts.to_dict(orient="records")

    return topic_trends


def get_country_data(df):
    # Step 1: Count occurrences of each country
    country_counts = df["country"].value_counts().reset_index()

    # Step 2: Rename columns for clarity
    country_counts.columns = ["country", "value"]

    # Step 3: Convert to JSON format (list of dictionaries)
    country_data = country_counts.to_dict(orient="records")

    return country_data

def get_IRL_yearly_comparison(df):
    # Group by 'published_year' and calculate the average
    result = df.groupby("published_year")[["intensity", "relevance", "likelihood"]].mean().reset_index()

    result['intensity'] = result['intensity'].round(2)
    result['relevance'] = result['relevance'].round(2)
    result['likelihood'] = result['likelihood'].round(2)

    # Convert to JSON
    irl_yearly_comparison = result.to_dict(orient="records")

    return irl_yearly_comparison

def apply_filters(filters):

    filter_conditions = []

    # Create individual OR conditions for each filter type
    if filters.get("end_year"):
        end_year_condition = or_(*[Data.end_year == year for year in filters["end_year"]])
        filter_conditions.append(end_year_condition)

    if filters.get("topic"):
        topic_condition = or_(*[Data.topic == topic for topic in filters["topic"]])
        filter_conditions.append(topic_condition)

    if filters.get("sector"):
        sector_condition = or_(*[Data.sector == sector for sector in filters["sector"]])
        filter_conditions.append(sector_condition)

    if filters.get("region"):
        region_condition = or_(*[Data.region == region for region in filters["region"]])
        filter_conditions.append(region_condition)

    if filters.get("pestle"):
        pestle_condition = or_(*[Data.pestle == pestle for pestle in filters["pestle"]])
        filter_conditions.append(pestle_condition)

    if filters.get("source"):
        source_condition = or_(*[Data.source == source for source in filters["source"]])
        filter_conditions.append(source_condition)

    if filters.get("country"):
        country_condition = or_(*[Data.country == country for country in filters["country"]])
        filter_conditions.append(country_condition)

    # Combine all conditions using AND
    final_query = and_(*filter_conditions) if filter_conditions else None

    if filter_conditions:
        query = Data.query.filter(and_(*filter_conditions))
    else:
        query = Data.query  # No filters applied, return all data

    # Fetch data and return as JSON
    results = query.all()
    data = [
        {
            "id": row.id,
            "end_year": row.end_year,
            "intensity": row.intensity,
            "sector": row.sector,
            "topic": row.topic,
            "insight": row.insight,
            "url": row.url,
            "region": row.region,
            "start_year": row.start_year,
            "impact": row.impact,
            "added_year": row.added_year,
            "added_month": row.added_month,
            "added_date": row.added_date,
            "added_time": row.added_time,
            "published_year": row.published_year,
            "published_month": row.published_month,
            "published_date": row.published_date,
            "published_time": row.published_time,
            "country": row.country,
            "relevance": row.relevance,
            "pestle": row.pestle,
            "source": row.source,
            "title": row.title,
            "likelihood": row.likelihood,
        }
        for row in results
    ]

    return data


def get_filtered_data(filters):
    data = apply_filters(filters)

    if data == []:
        return {
            "stats": {
                "num_datapoints": 0,
                "avg_intensity": 0,
                "avg_relevance": 0,
                "avg_likelihood": 0,
            },
            "monthly_intensity": [{}],
            "yearly_intensity": [{}],
            "intensity_relevance": [{}],
            "pestle_likelihood": [{}],
            "region_distribution": [{}],
            "country_data": [{}],
            "topic_trends": [{}],
            "irl_yearly_comparison": [{}]
        }

    df = pd.DataFrame(data)

    stats = get_stats(df)

    monthly_intensity = get_monthly_intensity(df)

    yearly_intensity = get_yearly_intensity(df)

    intensity_relevance = get_intensity_relevance(df)

    pestle_likelihood = get_pestle_likelihood(df)

    country_data = get_country_data(df)

    topic_trends = get_topic_trends(df)

    region_distribution = get_region_distribution(df)

    irl_yearly_comparison = get_IRL_yearly_comparison(df)

    return {
        "stats": stats,
        "monthly_intensity": monthly_intensity,
        "yearly_intensity": yearly_intensity,
        "intensity_relevance": intensity_relevance,
        "pestle_likelihood": pestle_likelihood,
        "region_distribution": region_distribution,
        "country_data": country_data,
        "topic_trends": topic_trends,
        "irl_yearly_comparison": irl_yearly_comparison
    }
