import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite")
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "db", "schema.sql")


def get_db():
    """Get a database connection with row factory enabled."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Apply schema.sql on startup if it exists."""
    if os.path.exists(SCHEMA_PATH):
        conn = get_db()
        with open(SCHEMA_PATH) as f:
            conn.executescript(f.read())
        conn.close()
        print(f"Schema applied from {SCHEMA_PATH}")
    else:
        print("No schema.sql found, skipping init")
