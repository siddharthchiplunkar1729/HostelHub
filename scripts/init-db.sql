-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('Student', 'Warden', 'Admin', 'Parent')) DEFAULT 'Student',
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    can_access_dashboard BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hostel_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_name TEXT NOT NULL,
    type TEXT CHECK (type IN ('Boys', 'Girls', 'Co-ed')),
    description TEXT,
    total_rooms INTEGER NOT NULL,
    available_rooms INTEGER NOT NULL,
    occupied_rooms INTEGER DEFAULT 0,
    location TEXT NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    virtual_tour_url TEXT,
    images TEXT[], -- Array of image URLs
    facilities TEXT[],
    warden_user_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    roll_number TEXT UNIQUE NOT NULL,
    course TEXT,
    year INTEGER,
    department TEXT,
    hostel_block_id UUID REFERENCES hostel_blocks(id),
    room_number TEXT,
    enrollment_status TEXT DEFAULT 'Prospective',
    photo TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hostel_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    hostel_block_id UUID REFERENCES hostel_blocks(id),
    status TEXT CHECK (status IN ('Pending', 'Accepted', 'Rejected', 'Withdrawn')) DEFAULT 'Pending',
    application_data JSONB,
    reviewed_by UUID REFERENCES users(id),
    reviewed_date TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    hostel_block_id UUID REFERENCES hostel_blocks(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    helpful INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mess_menu (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_block_id UUID REFERENCES hostel_blocks(id) ON DELETE CASCADE,
    day TEXT NOT NULL,
    breakfast TEXT,
    lunch TEXT,
    snacks TEXT,
    dinner TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_block_id UUID REFERENCES hostel_blocks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority TEXT DEFAULT 'Normal',
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    member_count INTEGER DEFAULT 0,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
