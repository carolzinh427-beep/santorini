-- Supabase Database Schema for Santorini Lounge

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Menu Categories Table
CREATE TABLE IF NOT EXISTS menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial Categories Seed
INSERT INTO menu_categories (slug, name, display_order) VALUES
('entradas', 'Entradas', 1),
('pratos', 'Pratos Principais', 2),
('porcoes', 'Porções', 3),
('sobremesas', 'Sobremesas', 4),
('drinks', 'Drinks Autorais', 5),
('bebidas', 'Bebidas', 6)
ON CONFLICT (slug) DO NOTHING;

-- 2. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_slug VARCHAR(50) REFERENCES menu_categories(slug) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    badge VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial Menu Items Seed
INSERT INTO menu_items (category_slug, name, description, price, image_url, badge, is_active, display_order) VALUES
('entradas', 'Tzatziki com Pão Pita Artesanal', 'Iogurte grego artesanal, pepino crocante, alho, azeite extra virgem grego e hortelã fresca.', 28.00, 'assets/moussaka.png', 'Clássico Grego', true, 1),
('entradas', 'Bruschetta Greca', 'Pão de fermentação natural grelhado, tomates uva assados, queijo Feta DOP, azeitonas Kalamata e orégano.', 32.00, 'assets/moussaka.png', 'Mais Pedido', true, 2),
('entradas', 'Polvo Grelhado à Moda Santorini', 'Tentáculos de polvo marinado grelhado no carvão, servido com purê de fava amarela e alcaparras.', 48.00, 'assets/polvo_grelhado.png', 'Destaque Chef', true, 3),

('pratos', 'Moussaka Tradicional', 'Camadas intercaladas de berinjela grelhada, batata, ragù de carne temperado com especiarias mediterrâneas e molho Béchamel gratado.', 78.00, 'assets/moussaka.png', 'Especialidade', true, 1),
('pratos', 'Risoto de Limão Siciliano com Camarões', 'Arroz arbóreo cremoso aromatizado com limão siciliano grelhado, camarões rosa grandes grelhados e finalizado com Feta.', 84.00, 'assets/polvo_grelhado.png', 'Imperdível', true, 2),
('pratos', 'Filé Mignon ao Molho de Ervas Mediterrâneas', 'Medalhão de filé mignon grelhado na crosta de pimentas e molho demi-glace aromatizado com alecrim, acompanhado de batatas rústicas gregas.', 89.00, 'assets/moussaka.png', 'Premium', true, 3),

('sobremesas', 'Baklava Tradicional Folhada', 'Massa folhada artesanal recheada com nozes, pistache moído, aromatizada com calda de mel e água de azahar.', 28.00, 'assets/baklava.png', 'Sobremesa Guia', true, 1),
('sobremesas', 'Cheesecake de Frutas Vermelhas Grega', 'Base de biscoito amanteigado, creme leve à base de iogurte grego e coulis artesanal de frutas vermelhas.', 26.00, 'assets/baklava.png', 'Refrescante', true, 2),
('sobremesas', 'Sorvete Grego com Mel e Pistache', 'Sorvete artesanal de iogurte grego cremoso, mel puro orgânico e praliné de pistaches crocantes.', 24.00, 'assets/baklava.png', 'Autoral', true, 3),

('drinks', 'Santorini Sunset', 'Gin premium, licor Aperol, xarope artesanal de maracujá, citrus infusionado com alecrim e espuma leve.', 36.00, 'assets/santorini_sunset.png', 'Drink Signature', true, 1),
('drinks', 'Ouzo Lemonade', 'Autêntico Ouzo grego, suco de limão siciliano fresco, xarope de hortelã, água com gás e gelo cristalino.', 32.00, 'assets/noite_ouzo.png', 'Tradição', true, 2),
('drinks', 'Blue Aegean Cocktail', 'Vodka refinada, curaçau blue, água de coco, infusão de capim-santo e lâmina de limão taiti.', 34.00, 'assets/blue_aegean.png', 'Visual Único', true, 3);

-- 3. Special Events Table
CREATE TABLE IF NOT EXISTS special_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    subtitle TEXT,
    event_date VARCHAR(100) NOT NULL,
    event_time VARCHAR(100) NOT NULL,
    price_per_person DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Special Event
INSERT INTO special_events (title, subtitle, event_date, event_time, price_per_person, description, image_url, is_active) VALUES
('NOITE DO OUZO', 'Uma noite especial com pratos selecionados, drinks exclusivos e música mediterrânea.', '25 DE MAIO, 2026', '20H ÀS 02H', 180.00, 'Celebre a cultura grega no Santorini Lounge com degustação especial de Ouzo, menu em 4 tempos assinado pelo Maître e trilha sonora autêntica.', 'assets/noite_ouzo.png', true);

-- 4. Special Event Menu Items Table
CREATE TABLE IF NOT EXISTS special_event_menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES special_events(id) ON DELETE CASCADE,
    course_type VARCHAR(50) NOT NULL, -- Entrada, Prato Principal, Sobremesa, Drink
    item_name VARCHAR(150) NOT NULL,
    item_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Photo Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100),
    category VARCHAR(50) DEFAULT 'ambiente', -- ambiente, gastronomia, drinks, eventos
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Table Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests_count INT NOT NULL,
    special_notes TEXT,
    status VARCHAR(50) DEFAULT 'pendente', -- pendente, confirmado, cancelado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Site Settings Table
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
