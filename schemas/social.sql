-- SCHEMA: Social / Community App
-- Tables: users, posts, likes

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  avatar_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_likes_post ON likes(post_id);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, username, bio) VALUES
  (1, 'Aisha Karimova', 'aisha_k', 'Product designer & coffee enthusiast'),
  (2, 'Marcus Chen', 'marcusc', 'Building things on the internet'),
  (3, 'Priya Nair', 'priya_builds', 'Full-stack dev | open source contributor');

INSERT INTO posts (user_id, content) VALUES
  (1, 'Just launched my first open source project! Took 3 months but worth every late night.'),
  (2, 'Hot take: the best UI is the one users never have to think about.'),
  (3, 'PSA: git commit early and often. Your future self will thank you.'),
  (1, 'Collaboration > competition. Found the best teammates at last week''s hackathon.'),
  (2, 'Shipped a feature today that reduced user drop-off by 40%. Small change, big impact.');

INSERT INTO likes (user_id, post_id) VALUES
  (2, 1), (3, 1), (1, 2), (3, 2), (1, 3), (2, 4), (3, 5);
