-- Widgets table seeds here (Example)
INSERT INTO maps (user_id, title, center_lat, center_long, created_at, description) VALUES (1, 'Vancouver', 49.2827, 123.1207, NOW(), 'The Vancity');
INSERT INTO maps (user_id, title, center_lat, center_long, created_at, description) VALUES (2, 'Tehran', 35.6892, 51.38907, NOW(), 'The capital of Iran');
INSERT INTO maps (user_id, title, center_lat, center_long, created_at, description) VALUES (3, 'Bangkok', 13.7563, 100.5018, NOW(), 'The capital of Thailand');
INSERT INTO maps (user_id, title, center_lat, center_long, created_at, description) VALUES (4, 'Rio de Janeiro', 22.9068, 43.1729, NOW(), 'A city from Brazil');
INSERT INTO marker_icons (name, description) VALUES ('Hotel', 'hotel');
INSERT INTO marker_icons (name, description) VALUES ('EV Station', 'ev_station');
INSERT INTO marker_icons (name, description) VALUES ('Bar', 'local_bar');
INSERT INTO marker_icons (name, description) VALUES ('Cafe', 'local_cafe');
INSERT INTO marker_icons (name, description) VALUES ('Standard Marker', 'place');
INSERT INTO marker_icons (name, description) VALUES ('Restaurant', 'restaurant');
INSERT INTO markers (map_id, user_id, title, lat, long, created_at, description, icon_id) VALUES (1, 1, 'Cafe Vancouver', 49.2814100447562, -123.08536284114001, NOW(), 'A lovely cafe in Vancouver', 4);
INSERT INTO markers (map_id, user_id, title, lat, long, created_at, description, icon_id) VALUES (1, 1, 'School in Vancouver', 49.28135226083929, -123.11498357280813, NOW(), 'A great coding school in Vancouver', 4);
INSERT INTO markers (map_id, user_id, title, lat, long, created_at, description, icon_id) VALUES (2, 2, 'Hotel in Tehran', 35.79313274353771, 51.356337069352, NOW(), 'A great hotel in Tehran', 1);
INSERT INTO markers (map_id, user_id, title, lat, long, created_at, description, icon_id) VALUES (3, 3, 'Tourist attraction in Bangkok', 13.743939688183945, 100.48894795560622, NOW(), 'A great place in Bangkok', 5);
INSERT INTO markers (map_id, user_id, title, lat, long, created_at, description, icon_id) VALUES (4, 4, 'Bar at Rio de Janeiro', -22.919211866381897, -43.23496761717818, NOW(), 'Fun bar at Rio de Janeiro', 3);
INSERT INTO fav_user_maps (map_id, user_id) VALUES (3, 1);
INSERT INTO fav_user_maps (map_id, user_id) VALUES (4, 2);
