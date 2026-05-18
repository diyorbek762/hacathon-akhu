-- SCHEMA: Sustainability / Green Challenge
-- Tables: users, submissions, scores

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  team TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- energy | waste | transport | food | water
  impact_estimate TEXT DEFAULT '', -- e.g. "saves 500kg CO2/year"
  evidence_url TEXT DEFAULT '',
  status TEXT DEFAULT 'pending', -- pending | approved | rejected
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  submission_id INTEGER NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  reason TEXT DEFAULT '',
  awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_user ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_scores_user ON scores(user_id);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, email, team) VALUES
  (1, 'Nina Johansson', 'nina@example.com', 'Green Futures'),
  (2, 'Kwame Asante', 'kwame@example.com', 'EcoTech'),
  (3, 'Lena Brandt', 'lena@example.com', 'Green Futures');

INSERT INTO submissions (user_id, title, description, category, impact_estimate, status) VALUES
  (1, 'Campus Solar Panel Initiative', 'Proposed installing 50 solar panels on the main building roof', 'energy', 'Saves 12 tonnes CO2/year', 'approved'),
  (2, 'Zero-Waste Cafeteria Program', 'Replacing all single-use plastics with compostable alternatives', 'waste', 'Eliminates 800kg plastic/year', 'approved'),
  (3, 'Bike-Share Expansion', 'Adding 20 new bike stations across the south campus', 'transport', 'Reduces 3,200 car trips/month', 'pending'),
  (1, 'Rainwater Collection System', 'Install collection tanks to irrigate campus gardens', 'water', 'Saves 50,000L water/month', 'approved'),
  (2, 'Plant-Based Monday Campaign', 'Weekly plant-based menu option in all dining halls', 'food', 'Reduces food emissions by 15%', 'pending');

INSERT INTO scores (user_id, submission_id, points, reason) VALUES
  (1, 1, 150, 'High impact, fully costed proposal'),
  (2, 2, 120, 'Practical, immediate implementation'),
  (1, 4, 90, 'Creative water conservation approach');
