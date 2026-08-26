-- Supabase Schema for Santorini Lounge

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Menu Categories Table
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_slug TEXT NOT NULL REFERENCES menu_categories(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  badge TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Special Events Table
CREATE TABLE IF NOT EXISTS special_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT DEFAULT 'Santorini Lounge',
  price_per_person NUMERIC(10, 2),
  image_url TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Special Event Menu Items Table
CREATE TABLE IF NOT EXISTS special_event_menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES special_events(id) ON DELETE CASCADE,
  course TEXT NOT NULL, -- e.g. Entrada, Prato Principal, Sobremesa, Drink
  title TEXT NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0
);

-- 5. Photo Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'ambiente', -- ambiente, gastronomia, drinks, eventos
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Table Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  guest_count INT NOT NULL,
  ambience_preference TEXT DEFAULT 'Salão Principal',
  special_requests TEXT,
  status TEXT DEFAULT 'pendente', -- pendente, confirmada, cancelada
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Restaurant Settings Table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Categories
INSERT INTO menu_categories (name, slug, display_order) VALUES
  ('Entradas', 'entradas', 1),
  ('Pratos Principais', 'principais', 2),
  ('Porções', 'porcoes', 3),
  ('Sobremesas', 'sobremesas', 4),
  ('Drinks', 'drinks', 5),
  ('Bebidas', 'bebidas', 6)
ON CONFLICT (slug) DO NOTHING;
