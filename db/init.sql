CREATE TABLE IF NOT EXISTS parcels (
    id SERIAL PRIMARY KEY,
    tracking_number TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    next_update TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    product TEXT NOT NULL,
    stance TEXT NOT NULL CHECK (stance IN ('Sent', 'Uploaded', 'Verified', 'Finalized')),
    is_positive BOOLEAN NOT NULL,
    text TEXT NOT NULL,
    "user" TEXT DEFAULT 'anonymous',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);