-- SCHEMA: Productivity / Task Manager
-- Tables: users, tasks, tags

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'todo', -- todo | in_progress | done
  priority TEXT DEFAULT 'medium', -- low | medium | high
  due_date TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL,
  label TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, email) VALUES
  (1, 'Jordan Blake', 'jordan@example.com'),
  (2, 'Sam Rivera', 'sam@example.com'),
  (3, 'Taylor Kim', 'taylor@example.com');

INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES
  (1, 'Design landing page mockup', 'Use Figma, follow brand guidelines', 'done', 'high', '2025-05-10'),
  (1, 'Set up CI/CD pipeline', 'GitHub Actions to Vercel, include build + test steps', 'in_progress', 'high', '2025-05-18'),
  (2, 'Write API documentation', 'Cover all endpoints, include example requests', 'todo', 'medium', '2025-05-20'),
  (2, 'User interviews round 2', 'Schedule 5 interviews with beta users', 'in_progress', 'medium', '2025-05-15'),
  (3, 'Optimize database queries', 'Profile slow queries, add indexes where needed', 'todo', 'low', '2025-05-25');

INSERT INTO tags (task_id, label) VALUES
  (1, 'design'), (2, 'devops'), (3, 'docs'), (4, 'research'), (5, 'backend');
