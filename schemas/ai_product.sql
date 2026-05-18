-- SCHEMA: AI / Future Tech Product
-- Tables: users, requests, results

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  plan TEXT DEFAULT 'free', -- free | pro
  credits INTEGER DEFAULT 50,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  input_text TEXT NOT NULL,
  input_type TEXT DEFAULT 'text', -- text | image | url | file
  model TEXT DEFAULT 'default',
  status TEXT DEFAULT 'pending', -- pending | processing | done | failed
  credits_used INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL,
  output_text TEXT NOT NULL,
  output_type TEXT DEFAULT 'text', -- text | json | image_url | list
  confidence REAL DEFAULT NULL,
  processing_ms INTEGER DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_requests_user ON requests(user_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_results_request ON results(request_id);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, email, plan, credits) VALUES
  (1, 'Alex Torres', 'alex@example.com', 'pro', 480),
  (2, 'Mei Lin', 'mei@example.com', 'free', 32),
  (3, 'Ravi Gupta', 'ravi@example.com', 'pro', 215);

INSERT INTO requests (user_id, input_text, input_type, status, credits_used) VALUES
  (1, 'Summarize this research paper on climate change adaptation strategies', 'text', 'done', 2),
  (1, 'Generate a product description for a sustainable water bottle', 'text', 'done', 1),
  (2, 'Translate this paragraph to Spanish and simplify the language', 'text', 'done', 1),
  (3, 'Analyze the sentiment of these 50 customer reviews', 'text', 'done', 3),
  (2, 'Create a quiz from this study guide chapter', 'text', 'processing', 2);

INSERT INTO results (request_id, output_text, output_type, confidence, processing_ms) VALUES
  (1, 'This paper examines three key adaptation strategies: coastal infrastructure reinforcement, agricultural diversification, and urban heat mitigation. Key finding: early investment reduces long-term costs by 60%.', 'text', 0.94, 1240),
  (2, 'Meet your hydration goals sustainably. This 500ml bottle is crafted from 100% recycled ocean plastic — because every sip should make a difference.', 'text', 0.88, 890),
  (3, 'Traducción: Este párrafo explica cómo el cambio climático afecta las comunidades costeras de manera significativa.', 'text', 0.97, 670),
  (4, 'Sentiment Analysis: 72% positive, 18% neutral, 10% negative. Top themes: shipping speed (positive), packaging (positive), price (negative).', 'json', 0.91, 2100);
