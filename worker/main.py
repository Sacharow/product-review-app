import time
import random
from db import get_connection

STATUSES = ['Nadana', 'Wysłana', 'W drodze', 'Dostarczona']

def update_statuses():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, status FROM parcels WHERE status != 'Dostarczona' AND next_update <= NOW()")
    for row in cursor.fetchall():
        parcel_id, status = row
        if status in STATUSES and status != 'Dostarczona':
            next_status = STATUSES[STATUSES.index(status) + 1]
            next_delay = random.randint(20, 60)
            cursor.execute(
                "UPDATE parcels SET status=%s, last_updated=NOW(), next_update=NOW() + INTERVAL '%s seconds' WHERE id=%s",
                (next_status, next_delay, parcel_id)
            )
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == '__main__':
    print("Worker started")
    while True:
        update_statuses()
        time.sleep(5)
