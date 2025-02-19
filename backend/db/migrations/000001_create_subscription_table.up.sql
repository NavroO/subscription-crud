CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'billing_cycle_type') THEN
        CREATE TYPE billing_cycle_type AS ENUM ('monthly', 'annually');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS subscription (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    monthly_cost DECIMAL(10, 2) NOT NULL,
    billing_cycle billing_cycle_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
