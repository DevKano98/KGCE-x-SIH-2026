-- db/schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','teacher','student')),
  class_section TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  teacher_id INTEGER REFERENCES users(id),
  semester INTEGER,
  department TEXT
);

CREATE TABLE timetable_slots (
  id SERIAL PRIMARY KEY,
  class_section TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  subject_id INTEGER REFERENCES subjects(id),
  teacher_id INTEGER REFERENCES users(id),
  room TEXT
);

CREATE TABLE marks_records (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(id),
  attendance_percentage REAL,
  internal_marks REAL,
  assignment_score REAL,
  study_hours_per_week REAL,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, subject_id) -- CRITICAL FIX
);

CREATE TABLE risk_predictions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(id),
  risk_level TEXT CHECK (risk_level IN ('Low','Medium','High')),
  predicted_score REAL,
  computed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tutor_logs (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(id),
  question TEXT,
  answer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin', 'admin@smartclass.com', '$2a$10$VhLdk1JPM1O6SaZ4NK6hqOgtUdxog/0vBhmDJ7nsGgwDlD/ICAZtG', 'admin')
ON CONFLICT (email) DO NOTHING;
