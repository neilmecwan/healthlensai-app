-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tax_id TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    role TEXT NOT NULL CHECK (role IN ('admin', 'provider', 'staff')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    features TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE physicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    npi TEXT NOT NULL UNIQUE,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    specialties TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE clinics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    address TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE billing_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    physician_id UUID NOT NULL REFERENCES physicians(id),
    clinic_id UUID NOT NULL REFERENCES clinics(id),
    patient_id TEXT NOT NULL,
    encounter_id TEXT NOT NULL,
    date_of_service DATE NOT NULL,
    cpt_code TEXT NOT NULL,
    icd10_codes TEXT[] NOT NULL DEFAULT '{}',
    charges DECIMAL(10,2) NOT NULL,
    payments DECIMAL(10,2) NOT NULL,
    adjustments DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_billing_date_of_service ON billing_data(date_of_service);
CREATE INDEX idx_billing_organization ON billing_data(organization_id);
CREATE INDEX idx_billing_physician ON billing_data(physician_id);
CREATE INDEX idx_billing_clinic ON billing_data(clinic_id);

-- Insert dummy data
INSERT INTO organizations (name, tax_id, address, status) VALUES
    ('Memorial Hospital', '12-3456789', '123 Medical Center Dr, Austin, TX 78701', 'active'),
    ('City Medical Center', '98-7654321', '456 Healthcare Ave, Austin, TX 78702', 'active'),
    ('Valley Clinic', '45-6789123', '789 Valley Road, Austin, TX 78703', 'active');

INSERT INTO users (email, full_name, organization_id, role, status, features) VALUES
    ('john.smith@memorial.com', 'Dr. John Smith', (SELECT id FROM organizations WHERE name = 'Memorial Hospital'), 'admin', 'active', ARRAY['analytics', 'reports', 'billing']),
    ('sarah.johnson@memorial.com', 'Dr. Sarah Johnson', (SELECT id FROM organizations WHERE name = 'Memorial Hospital'), 'provider', 'active', ARRAY['analytics', 'reports']),
    ('michael.chen@citymedical.com', 'Dr. Michael Chen', (SELECT id FROM organizations WHERE name = 'City Medical Center'), 'provider', 'active', ARRAY['analytics', 'reports']);

INSERT INTO physicians (name, npi, organization_id, specialties, status) VALUES
    ('Dr. John Smith', '1234567890', (SELECT id FROM organizations WHERE name = 'Memorial Hospital'), ARRAY['Cardiology'], 'active'),
    ('Dr. Sarah Johnson', '0987654321', (SELECT id FROM organizations WHERE name = 'Memorial Hospital'), ARRAY['Pediatrics'], 'active'),
    ('Dr. Michael Chen', '5678901234', (SELECT id FROM organizations WHERE name = 'City Medical Center'), ARRAY['Orthopedics'], 'active');

INSERT INTO clinics (name, organization_id, address, status) VALUES
    ('Memorial Hospital - Main', (SELECT id FROM organizations WHERE name = 'Memorial Hospital'), '123 Medical Center Dr, Austin, TX 78701', 'active'),
    ('Memorial Hospital - North', (SELECT id FROM organizations WHERE name = 'Memorial Hospital'), '456 North Medical Blvd, Austin, TX 78731', 'active'),
    ('City Medical Center', (SELECT id FROM organizations WHERE name = 'City Medical Center'), '456 Healthcare Ave, Austin, TX 78702', 'active');

-- Function to generate random billing data
CREATE OR REPLACE FUNCTION generate_billing_data()
RETURNS void AS $$
DECLARE
    physician_rec RECORD;
    clinic_rec RECORD;
    current_date DATE;
    num_encounters INTEGER;
    charges DECIMAL(10,2);
    payments DECIMAL(10,2);
    adjustments DECIMAL(10,2);
    cpt_codes TEXT[] := ARRAY['99213', '99214', '99215'];
    icd10_codes TEXT[] := ARRAY['I10', 'E11.9', 'J45.909'];
BEGIN
    -- Generate data for the last 75 days
    FOR current_date IN SELECT generate_series(
        (CURRENT_DATE - INTERVAL '75 days')::date,
        CURRENT_DATE,
        '1 day'::interval
    )::date LOOP
        -- For each physician
        FOR physician_rec IN SELECT id, organization_id FROM physicians LOOP
            -- Get a clinic for this physician's organization
            SELECT id INTO clinic_rec
            FROM clinics 
            WHERE organization_id = physician_rec.organization_id 
            LIMIT 1;
            
            -- Generate 3-10 encounters per day
            num_encounters := floor(random() * 8 + 3);
            
            FOR i IN 1..num_encounters LOOP
                -- Generate random amounts
                charges := (random() * 500 + 200)::DECIMAL(10,2);
                payments := (charges * (random() * 0.3 + 0.7))::DECIMAL(10,2);
                adjustments := (charges - payments)::DECIMAL(10,2);
                
                INSERT INTO billing_data (
                    organization_id,
                    physician_id,
                    clinic_id,
                    patient_id,
                    encounter_id,
                    date_of_service,
                    cpt_code,
                    icd10_codes,
                    charges,
                    payments,
                    adjustments
                ) VALUES (
                    physician_rec.organization_id,
                    physician_rec.id,
                    clinic_rec.id,
                    'P' || floor(random() * 10000)::text,
                    'E' || floor(random() * 100000)::text,
                    current_date,
                    cpt_codes[1 + floor(random() * 3)::int],
                    ARRAY[icd10_codes[1 + floor(random() * 3)::int]],
                    charges,
                    payments,
                    adjustments
                );
            END LOOP;
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Generate billing data
SELECT generate_billing_data();

-- Create RLS policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE physicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their organization's data"
    ON organizations FOR SELECT
    USING (auth.uid() IN (
        SELECT auth.uid() FROM users WHERE organization_id = organizations.id
    ));

CREATE POLICY "Users can view their organization's users"
    ON users FOR SELECT
    USING (auth.uid() IN (
        SELECT auth.uid() FROM users WHERE organization_id = users.organization_id
    ));

CREATE POLICY "Users can view their organization's physicians"
    ON physicians FOR SELECT
    USING (auth.uid() IN (
        SELECT auth.uid() FROM users WHERE organization_id = physicians.organization_id
    ));

CREATE POLICY "Users can view their organization's clinics"
    ON clinics FOR SELECT
    USING (auth.uid() IN (
        SELECT auth.uid() FROM users WHERE organization_id = clinics.organization_id
    ));

CREATE POLICY "Users can view their organization's billing data"
    ON billing_data FOR SELECT
    USING (auth.uid() IN (
        SELECT auth.uid() FROM users WHERE organization_id = billing_data.organization_id
    ));