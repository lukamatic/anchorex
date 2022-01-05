-- Lozinke su hesovane pomocu BCrypt algoritma https://bcrypt-generator.com/
-- Lozinka za admin-a je admin123
-- Lozinka za client-a je client123
-- Lozinka za lodge-ownera je bbogi1219
-- Lozinka za instructor-a je luka123

INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, last_password_reset_date, enabled) VALUES ('admin@example.com','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Marko', 'Markovic', 'Kralja Petra 13A', 'Zemun', 'Srbija', '063123123123', '','2017-10-01 21:58:58.508-07', true);
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, last_password_reset_date, enabled) VALUES ('client@example.com', '$2a$10$4ILXOLp7qx579OzSL0QpbeVA.QkeG1NNSPcrhbZ.TfA98bbQoGqWW', 'Nikola', 'Nikolic','Bulevar Despota Stefana 77', 'Valjevo', 'Srbija', '064789789789', 'Volim kosarku, narodnjake i dobre zenske.', '2017-10-01 18:57:58.508-07', false);
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, last_password_reset_date, enabled) VALUES ('bogdanovicognjen@gmail.com', '$2a$12$0DPQjNrTujN.VG8cZehUr.bZq4hV9Fhdm7KLclpO1lF9D0skuEtKW', 'Ognjen', 'Bogdanovic', 'Trg Kralja Petra I', 'Zabalj', 'Srbija', '061238682','', '2019-10-01 18:57:58.508-07', true)
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, last_password_reset_date, enabled) VALUES ('luka.mat99@gmail.com', '$2a$10$2D.BqZypOC4HbqT7GzNsvu6q/HC.YINRcjUBe9vPatTHmkpMmf9Me', 'Luka', 'Matic', 'Veljka Dugosevica', 'Ruma', 'Srbija', '+381123123','', '1999-04-18 18:57:58.508-07', true)
INSERT INTO ROLE (name) VALUES ('ROLE_ADMIN');
INSERT INTO ROLE (name) VALUES ('ROLE_CLIENT');
INSERT INTO ROLE (name) VALUES ('ROLE_INSTRUCTOR');
INSERT INTO ROLE (name) VALUES ('ROLE_LODGE_OWNER');
INSERT INTO ROLE (name) VALUES ('ROLE_SHIP_OWNER');

INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1); -- marku dodeljujemo rolu ADMIN
INSERT INTO USER_ROLE (user_id, role_id) VALUES (2, 2); -- nikoli dodeljujemo rolu CLIENT
INSERT INTO USER_ROLE (user_id, role_id) VALUES (3, 4); -- ognjenu dodeljujemo rolu LODGE_OWNER
INSERT INTO USER_ROLE (user_id, role_id) VALUES (4, 3); -- luki dodeljujemo rolu INSTRUCTOR