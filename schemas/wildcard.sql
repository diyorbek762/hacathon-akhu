-- SCHEMA: Open / Wildcard — Voting + Submission Platform
-- Tables: users, submissions, votes

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  vote_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active | closed | winner
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  submission_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_votes ON submissions(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_votes_submission ON votes(submission_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_votes_unique ON votes(user_id, submission_id);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, email) VALUES
  (1, 'Ava Nguyen', 'ava@example.com'),
  (2, 'Ben Okoro', 'ben@example.com'),
  (3, 'Clara Schmidt', 'clara@example.com');

INSERT INTO submissions (user_id, title, description, category, vote_count, status) VALUES
  (1, 'Community Tool Library', 'A platform where neighbors can lend tools instead of buying new ones', 'community', 24, 'active'),
  (2, 'Local Food Rescue Network', 'Connect restaurants with surplus food to shelters and food banks', 'food', 31, 'active'),
  (3, 'Skill Swap App', 'Trade skills with people in your neighborhood — coding for cooking, etc.', 'education', 18, 'active'),
  (1, 'Urban Garden Planner', 'Map and coordinate community garden plots across the city', 'environment', 15, 'active'),
  (2, 'Event Carpool Matcher', 'Automatically match attendees going to the same event for carpooling', 'transport', 22, 'active');

INSERT INTO votes (user_id, submission_id) VALUES
  (1, 2), (1, 5),
  (2, 1), (2, 3),
  (3, 2), (3, 4);
