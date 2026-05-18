-- SCHEMA: Health / Wellness Tracker
-- Tables: users, logs, goals

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category TEXT NOT NULL, -- sleep | exercise | water | mood | nutrition
  value REAL NOT NULL,    -- numeric value (hours, ml, rating 1-10, etc.)
  unit TEXT NOT NULL,     -- hours | ml | km | kcal | score
  note TEXT DEFAULT '',
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  target_value REAL NOT NULL,
  unit TEXT NOT NULL,
  period TEXT DEFAULT 'daily', -- daily | weekly
  active INTEGER DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_logs_user ON logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_category ON logs(category);
CREATE INDEX IF NOT EXISTS idx_logs_logged_at ON logs(logged_at);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, email, age) VALUES
  (1, 'Elena Moss', 'elena@example.com', 28),
  (2, 'Daniel Park', 'daniel@example.com', 34),
  (3, 'Sofía Mendez', 'sofia@example.com', 25);

INSERT INTO goals (user_id, category, target_value, unit, period) VALUES
  (1, 'sleep', 8, 'hours', 'daily'),
  (1, 'water', 2000, 'ml', 'daily'),
  (1, 'exercise', 30, 'minutes', 'daily'),
  (2, 'sleep', 7, 'hours', 'daily'),
  (2, 'exercise', 10, 'km', 'weekly');

INSERT INTO logs (user_id, category, value, unit, note) VALUES
  (1, 'sleep', 7.5, 'hours', 'Slept well, no interruptions'),
  (1, 'water', 1800, 'ml', 'Slightly under goal'),
  (1, 'exercise', 35, 'minutes', 'Morning run in the park'),
  (2, 'sleep', 6.5, 'hours', 'Late night, need to fix schedule'),
  (2, 'exercise', 5.2, 'km', 'Evening jog'),
  (3, 'mood', 8, 'score', 'Productive day, feeling good'),
  (3, 'water', 2200, 'ml', 'Beat the goal today');
