-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS markers CASCADE;
DROP TABLE IF EXISTS marker_icons CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  center_lat DECIMAL(17, 15) NOT NULL,
  center_long DECIMAL(18, 15) NOT NULL,
  zoom INTEGER NOT NULL DEFAULT 12,
  search_keyword VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  description TEXT
);

CREATE TABLE fav_user_maps (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id),
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE marker_icons (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  description TEXT
);

CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id),
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  lat DECIMAL(17, 15) NOT NULL,
  long DECIMAL(18, 15) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  description TEXT,
  icon_id INTEGER REFERENCES marker_icons(id),
  image VARCHAR(255)
);

