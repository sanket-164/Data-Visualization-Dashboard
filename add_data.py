import psycopg2
import json
from datetime import datetime

# PostgreSQL connection details
DB_CONFIG = {
    "host": "localhost",
    "port": "5432",
    "user": "postgres",
    "password": "",
    "database": "blackcoffer"
}

# Sample JSON array
with open("jsondata.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Establish connection
conn = psycopg2.connect(**DB_CONFIG)
cursor = conn.cursor()

# Create table if not exists
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS data (
        id SERIAL PRIMARY KEY,
        end_year VARCHAR(10),
        intensity INT,
        sector VARCHAR(255),
        topic VARCHAR(255),
        insight TEXT,
        url TEXT,
        region VARCHAR(255),
        start_year VARCHAR(10),
        impact TEXT,
        added_month INT,
        added_date INT,
        added_year INT,
        added_time TIME,
        published_month INT,
        published_date INT,
        published_year INT,
        published_time TIME,
        country VARCHAR(255),
        relevance INT,
        pestle VARCHAR(255),
        source VARCHAR(255),
        title TEXT,
        likelihood INT
    )
"""
)

# Insert data into table
query = """
    INSERT INTO data (
        end_year, intensity, sector, topic, insight, url, region, start_year, impact, 
        added_month, added_date, added_year, added_time,
        published_month, published_date, published_year, published_time,
        country, relevance, pestle, source, title, likelihood
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
"""


def parse_datetime(dt_str):
    try:
        dt_obj = datetime.strptime(dt_str, "%B, %d %Y %H:%M:%S")
        return dt_obj.month, dt_obj.day, dt_obj.year, dt_obj.strftime("%H:%M:%S")
    except ValueError:
        print(dt_str)
        return None, None, None, None


for entry in data:
    added_month, added_date, added_year, added_time = parse_datetime(entry["added"])
    published_month, published_date, published_year, published_time = parse_datetime(
        entry["published"]
    )

    cursor.execute(
        query,
        (
            entry["end_year"] if entry["end_year"] else None,
            entry["intensity"] if entry["intensity"] != "" else None,  # Fix here
            entry["sector"] if entry["sector"] else None,
            entry["topic"] if entry["topic"] else None,
            entry["insight"] if entry["insight"] else None,
            entry["url"] if entry["url"] else None,
            entry["region"] if entry["region"] else None,
            entry["start_year"] if entry["start_year"] else None,
            entry["impact"] if entry["impact"] else None,
            added_month,
            added_date,
            added_year,
            added_time,
            published_month,
            published_date,
            published_year,
            published_time,
            entry["country"] if entry["country"] else None,
            entry["relevance"] if entry["relevance"] != "" else None,  # Fix here
            entry["pestle"] if entry["pestle"] else None,
            entry["source"] if entry["source"] else None,
            entry["title"] if entry["title"] else None,
            entry["likelihood"] if entry["likelihood"] != "" else None,  # Fix here
        ),
    )


# Commit transaction and close connection
conn.commit()
cursor.close()
conn.close()

print("Data inserted successfully.")
