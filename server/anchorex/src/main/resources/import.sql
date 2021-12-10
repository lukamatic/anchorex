-- Lozinke su hesovane pomocu BCrypt algoritma https://bcrypt-generator.com/
-- Lozinka za admin-a je admin123
-- Lozinka za client-a je client123

INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, last_password_reset_date) VALUES ('admin@example.com','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Marko', 'Markovic', 'Kralja Petra 13A', 'Zemun', 'Srbija', '063123123123', '','2017-10-01 21:58:58.508-07');
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, last_password_reset_date) VALUES ('client@example.com', '$2a$10$4ILXOLp7qx579OzSL0QpbeVA.QkeG1NNSPcrhbZ.TfA98bbQoGqWW', 'Nikola', 'Nikolic','Bulevar Despota Stefana 77', 'Valjevo', 'Srbija', '064789789789', 'Volim kosarku, narodnjake i dobre zenske.', '2017-10-01 18:57:58.508-07');

INSERT INTO ROLE (name) VALUES ('ROLE_ADMIN');
INSERT INTO ROLE (name) VALUES ('ROLE_CLIENT');
INSERT INTO ROLE (name) VALUES ('ROLE_INSTRUCTOR');
INSERT INTO ROLE (name) VALUES ('ROLE_LODGE_OWNER');
INSERT INTO ROLE (name) VALUES ('ROLE_SHIP_OWNER');

INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1); -- marku dodeljujemo rolu ADMIN
INSERT INTO USER_ROLE (user_id, role_id) VALUES (2, 2); -- nikoli dodeljujemo rolu CLIENT
