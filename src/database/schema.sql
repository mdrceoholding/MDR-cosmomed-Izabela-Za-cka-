-- EU Grants Hub Database Schema for MedTech
-- PostgreSQL 14+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if exist (for clean setup)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS grants CASCADE;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Table: users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    organization VARCHAR(255),
    roles JSONB NOT NULL DEFAULT '["Viewer"]', -- Admin, Manager, Viewer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL, -- Badania, Innowacje, Edukacja, Infrastruktura
    icon VARCHAR(50) NOT NULL,
    description TEXT
);

-- Table: statuses
CREATE TABLE statuses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL CHECK (name IN ('Aktywny', 'Zamknięty', 'Planowany', 'Wznowiony'))
);

-- Table: grants
CREATE TABLE grants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(500) NOT NULL,
    status_id UUID NOT NULL REFERENCES statuses(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    amount_min DECIMAL(15, 2) NOT NULL, -- in EUR
    amount_max DECIMAL(15, 2) NOT NULL, -- in EUR
    currency VARCHAR(3) DEFAULT 'EUR' CHECK (currency IN ('EUR', 'PLN')),
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    success_rate INT DEFAULT 0 CHECK (success_rate >= 0 AND success_rate <= 100),
    description TEXT,
    requirements JSONB DEFAULT '[]', -- Array of requirement strings
    apply_link VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: partners
CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    country VARCHAR(2) NOT NULL, -- ISO country code
    type VARCHAR(50) NOT NULL CHECK (type IN ('Przedsiębiorstwo', 'Instytut badawczy', 'Uniwersytet', 'Konsorcjum')),
    specializations JSONB DEFAULT '[]', -- Array of specialization strings
    contact_info JSONB DEFAULT '{}', -- {email, phone, website}
    profile_link VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: applications
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    grant_id UUID NOT NULL REFERENCES grants(id) ON DELETE CASCADE,
    partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Szkic' CHECK (status IN ('Szkic', 'Złożona', 'W ocenie', 'Zatwierdzona', 'Odrzucona')),
    submitted_at TIMESTAMP WITH TIME ZONE,
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- CV, Budget, Timeline, Impact
    file_url VARCHAR(500) NOT NULL,
    file_size INT NOT NULL, -- in bytes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Deadline', 'StatusChange', 'NewGrant', 'ApplicationUpdate')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    grant_id UUID REFERENCES grants(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_grants_status ON grants(status_id);
CREATE INDEX idx_grants_category ON grants(category_id);
CREATE INDEX idx_grants_deadline ON grants(deadline);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_grant ON applications(grant_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_documents_application ON documents(application_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_partners_country ON partners(country);
CREATE INDEX idx_partners_type ON partners(type);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grants_updated_at BEFORE UPDATE ON grants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default statuses
INSERT INTO statuses (name) VALUES
    ('Aktywny'),
    ('Zamknięty'),
    ('Planowany'),
    ('Wznowiony');

-- Insert default categories
INSERT INTO categories (name, icon, description) VALUES
    ('Badania', 'flask', 'Projekty badawcze i rozwojowe w obszarze MedTech'),
    ('Innowacje', 'lightbulb', 'Innowacyjne rozwiązania technologiczne i produktowe'),
    ('Edukacja', 'graduation-cap', 'Programy edukacyjne i szkoleniowe dla sektora medycznego'),
    ('Infrastruktura', 'building', 'Rozwój infrastruktury badawczej i medycznej');

-- Comments
COMMENT ON TABLE users IS 'System users with role-based access';
COMMENT ON TABLE categories IS 'Grant categories for classification';
COMMENT ON TABLE statuses IS 'Grant status enumeration';
COMMENT ON TABLE grants IS 'EU grants available for MedTech sector';
COMMENT ON TABLE partners IS 'Potential collaboration partners for grant applications';
COMMENT ON TABLE applications IS 'User applications for grants';
COMMENT ON TABLE documents IS 'Supporting documents for applications';
COMMENT ON TABLE notifications IS 'User notifications for deadlines and updates';
