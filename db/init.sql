CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    product TEXT NOT NULL,
    stance TEXT NOT NULL CHECK (stance IN ('Sent', 'Uploaded', 'Verified', 'Finalized')),
    is_positive BOOLEAN NOT NULL,
    text TEXT NOT NULL,
    "user" TEXT DEFAULT 'anonymous',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);