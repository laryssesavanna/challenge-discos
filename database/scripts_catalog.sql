-- Managing table disc

#INSERT INTO disc (title, artist_name, genre, year, createdAt) VALUES ('Neon Balroom', 'Silverchair', 'Rock', '2019-12-16', '2019-12-16');

#SELECT * FROM disc;

#SELECT title, artist_name, genre, year FROM disc WHERE idDisc = 1;

#DELETE FROM disc WHERE idDisc =4;

-- Managing table collection

#INSERT INTO collection (name, description, createdAt) VALUES ('MPB', 'Bandas dos anos 90', '2019-12-14');

#SELECT * FROM collection;

-- Managing table disc_collection

#INSERT INTO disc_collection VALUES (2, 1);
#DELETE FROM disc_collection WHERE Disc_idDisc = 1;

-- Todos os discos da coleção de id 1;
#SELECT Disc_idDisc FROM disc_collection WHERE Collection_idCollection = 1;

#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'