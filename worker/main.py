import time
import random
from db import get_connection

REVIEW_STANCES = ['Sent', 'Uploaded', 'Verified', 'Finalized']

def update_review_stances():
    conn = get_connection()
    cursor = conn.cursor()
    # Select reviews that are not finalized and haven't been updated in the last 2 seconds
    cursor.execute(
        "SELECT id, stance FROM reviews WHERE stance != 'Finalized' AND (last_updated IS NULL OR last_updated <= NOW() - INTERVAL '2 seconds')"
    )
    for row in cursor.fetchall():
        review_id, stance = row
        if stance in REVIEW_STANCES and stance != 'Finalized':
            next_stance = REVIEW_STANCES[REVIEW_STANCES.index(stance) + 1]
            cursor.execute(
                "UPDATE reviews SET stance=%s, last_updated=NOW() WHERE id=%s",
                (next_stance, review_id)
            )
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == '__main__':
    print("Worker started")
    while True:
        update_review_stances()
        time.sleep(2)
