-- Managing table disc

#INSERT INTO disc (title, artist_name, genre, year, createdAt) VALUES ('disco 4', 'desc 4', 'forro', '2017-05-07', '2019-10-10');

#SELECT * FROM disc;

#SELECT title, artist_name, genre, year FROM disc WHERE idDisc = 1;

#DELETE FROM disc WHERE idDisc =1;

-- Managing table collection

#INSERT INTO collection (name, description, createdAt) VALUES ('Todos gostam', 'Variadas', '2018-12-14');

#SELECT * FROM collection;

-- Managing table disc_collection

#INSERT INTO disc_collection VALUES (4, 3);
#DELETE FROM disc_collection WHERE Disc_idDisc = 9 AND Collection_idCollection = 2;
SELECT * FROM disc_collection;
#SELECT idDisc, title, artist_name, genre, year FROM disc_collection dc, disc d WHERE dc.Disc_idDisc = d.idDisc AND dc.Collection_idCollection = 4;

-- Todos os discos da coleção de id 1;
#SELECT Disc_idDisc FROM disc_collection WHERE Collection_idCollection = 1;

#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'