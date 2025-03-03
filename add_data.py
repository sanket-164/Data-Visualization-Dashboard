import sqlite3
import json
from datetime import datetime

# SQLite database file
DB_FILE = "blackcoffer.db"

# Sample JSON array
with open("jsondata.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Establish connection
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Create table if not exists
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        end_year TEXT,
        intensity INTEGER,
        sector TEXT,
        topic TEXT,
        insight TEXT,
        url TEXT,
        region TEXT,
        start_year TEXT,
        impact TEXT,
        added_month INTEGER,
        added_date INTEGER,
        added_year INTEGER,
        added_time TEXT,
        published_month INTEGER,
        published_date INTEGER,
        published_year INTEGER,
        published_time TEXT,
        country TEXT,
        relevance INTEGER,
        pestle TEXT,
        source TEXT,
        title TEXT,
        likelihood INTEGER
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
"""


def parse_datetime(dt_str):
    try:
        dt_obj = datetime.strptime(dt_str, "%B, %d %Y %H:%M:%S")
        return dt_obj.month, dt_obj.day, dt_obj.year, dt_obj.strftime("%H:%M:%S")
    except ValueError:
        print(f"Skipping invalid date format: {dt_str}")
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
            (
                int(entry["intensity"])
                if isinstance(entry["intensity"], str) and entry["intensity"].isdigit()
                else entry["intensity"]
            ),
            entry["sector"] or None,
            entry["topic"] or None,
            entry["insight"] or None,
            entry["url"] or None,
            entry["region"] or None,
            entry["start_year"] or None,
            entry["impact"] or None,
            added_month,
            added_date,
            added_year,
            added_time,
            published_month,
            published_date,
            published_year,
            published_time,
            entry["country"] or None,
            (
                int(entry["relevance"])
                if isinstance(entry["relevance"], str) and entry["relevance"].isdigit()
                else entry["relevance"]
            ),
            entry["pestle"] or None,
            entry["source"] or None,
            entry["title"] or None,
            (
                int(entry["likelihood"])
                if isinstance(entry["likelihood"], str)
                and entry["likelihood"].isdigit()
                else entry["likelihood"]
            ),
        ),
    )


# Commit transaction and close connection
conn.commit()
cursor.close()
conn.close()

print("Data inserted successfully into SQLite.")
