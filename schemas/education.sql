-- SCHEMA: Education / Learning Platform
-- Tables: users, courses, progress

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'student', -- student | instructor
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  instructor_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '', -- coding | design | business | science
  duration_hours REAL DEFAULT 0,
  level TEXT DEFAULT 'beginner', -- beginner | intermediate | advanced
  thumbnail_url TEXT DEFAULT '',
  published INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  lessons_completed INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  percent_complete REAL DEFAULT 0,
  last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);

-- SEED DATA
INSERT OR IGNORE INTO users (id, name, email, role) VALUES
  (1, 'Dr. Amara Osei', 'amara@example.com', 'instructor'),
  (2, 'Lucas Ferreira', 'lucas@example.com', 'student'),
  (3, 'Yuki Tanaka', 'yuki@example.com', 'student');

INSERT INTO courses (instructor_id, title, description, category, duration_hours, level) VALUES
  (1, 'Python for Absolute Beginners', 'Start from zero and build real projects in Python', 'coding', 12.5, 'beginner'),
  (1, 'UI/UX Design Fundamentals', 'Learn Figma, color theory, and user research basics', 'design', 8.0, 'beginner'),
  (1, 'Data Structures & Algorithms', 'Master the essentials for technical interviews', 'coding', 20.0, 'intermediate'),
  (1, 'Build a Startup in a Weekend', 'Idea to MVP: validation, design, and launch', 'business', 6.0, 'beginner'),
  (1, 'Machine Learning Basics', 'Hands-on intro to ML with scikit-learn', 'coding', 15.0, 'intermediate');

INSERT INTO progress (user_id, course_id, lessons_completed, total_lessons, percent_complete, completed) VALUES
  (2, 1, 18, 24, 75, 0),
  (2, 2, 12, 12, 100, 1),
  (3, 1, 6, 24, 25, 0),
  (3, 3, 4, 40, 10, 0),
  (2, 4, 8, 10, 80, 0);
