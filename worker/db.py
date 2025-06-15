import os
import psycopg2
import time

def get_connection():
    retries = 10
    while retries > 0:
        try:
            return psycopg2.connect(os.environ['DATABASE_URL'])
        except psycopg2.OperationalError as e:
            print("Database not ready, waiting...")
            time.sleep(2)
            retries -= 1
    raise Exception("Failed to connect to database after retries")
