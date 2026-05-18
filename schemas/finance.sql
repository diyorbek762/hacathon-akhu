-- SCHEMA: Finance / Commerce / Marketplace
-- Tables: users, products, orders

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'buyer', -- buyer | seller
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seller_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price REAL NOT NULL,
  category TEXT DEFAULT '',
  stock INTEGER DEFAULT 10,
  image_url TEXT DEFAULT '',
  active INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  buyer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  total_price REAL NOT NULL,
  status TEXT DEFAULT 'pending', -- pending | confirmed | shipped | delivered
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, email, role) VALUES
  (1, 'Chloe Martin', 'chloe@example.com', 'seller'),
  (2, 'Omar Hassan', 'omar@example.com', 'buyer'),
  (3, 'Ingrid Larsson', 'ingrid@example.com', 'buyer');

INSERT INTO products (seller_id, name, description, price, category, stock) VALUES
  (1, 'Wireless Noise-Cancelling Headphones', 'Premium sound quality with 30hr battery', 89.99, 'electronics', 15),
  (1, 'Ergonomic Laptop Stand', 'Adjustable aluminum stand for any laptop', 34.99, 'accessories', 42),
  (1, 'Mechanical Keyboard — Compact', 'TKL layout, tactile switches, RGB backlit', 74.99, 'electronics', 8),
  (1, 'USB-C Hub (7-in-1)', 'HDMI 4K, 3× USB-A, SD card, 100W charging', 49.99, 'accessories', 25),
  (1, 'Smart Desk Lamp', 'Color temperature control, USB charging port, touch dimmer', 42.00, 'home', 20);

INSERT INTO orders (buyer_id, product_id, quantity, total_price, status) VALUES
  (2, 1, 1, 89.99, 'delivered'),
  (2, 2, 2, 69.98, 'shipped'),
  (3, 3, 1, 74.99, 'confirmed'),
  (3, 4, 1, 49.99, 'pending'),
  (2, 5, 1, 42.00, 'delivered');
