-- Lozinke su hesovane pomocu BCrypt algoritma https://bcrypt-generator.com/
-- Lozinka za admin-a je admin123
-- Lozinka za client-a je client123
-- Lozinka za lodge-ownera je bbogi1219
-- Lozinka za instructor-a je luka123
-- Lozinka za ship-ownera je brod123

INSERT INTO BUSINESS_CONFIGURATION (app_percentage) VALUES (20.0);
INSERT INTO LOYALTY_PROGRAM (reservation_points, bronze_border, silver_border, gold_border, bronze_discount, silver_discount, gold_discount) VALUES (50, 0, 150, 300, 0.0, 10.0, 20.0);

INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, penalty_count, last_password_reset_date, enabled, deleted, points) VALUES ('admin@example.com','$2a$10$RU5f8TgZHZqVHk.Nl1/g7OYbSLB6Fgpn2RvO6hs6LddAW.pQrAxBW', 'Marko', 'Markovic', 'Kralja Petra 13A', 'Zemun', 'Srbija', '063123123123', '', 0, '2017-10-01 21:58:58.508-07', true, false, 0);
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, penalty_count, last_password_reset_date, enabled, deleted, points) VALUES ('client@example.com', '$2a$10$4ILXOLp7qx579OzSL0QpbeVA.QkeG1NNSPcrhbZ.TfA98bbQoGqWW', 'Nikola', 'Nikolic','Bulevar Despota Stefana 77', 'Valjevo', 'Srbija', '064789789789', 'Volim kosarku, narodnjake i dobre zenske.', 0, '2017-10-01 18:57:58.508-07', true, false, 0);
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, penalty_count, last_password_reset_date, enabled, deleted, points) VALUES ('bogdanovicognjen@gmail.com', '$2a$12$0DPQjNrTujN.VG8cZehUr.bZq4hV9Fhdm7KLclpO1lF9D0skuEtKW', 'Ognjen', 'Bogdanovic', 'Trg Kralja Petra I', 'Zabalj', 'Srbija', '061238682', '', 0,  '2019-10-01 18:57:58.508-07', true, false, 0)
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, penalty_count, last_password_reset_date, enabled, deleted, points) VALUES ('luka.mat99@gmail.com', '$2a$10$2D.BqZypOC4HbqT7GzNsvu6q/HC.YINRcjUBe9vPatTHmkpMmf9Me', 'Luka', 'Matic', 'Veljka Dugosevica', 'Ruma', 'Srbija', '+381123123', '', 0,  '1999-04-18 18:57:58.508-07', true, false, 0)
INSERT INTO USERS (email, password, first_name, last_name, address, city, country, phone_number, biography, penalty_count, last_password_reset_date, enabled, deleted, points) VALUES ('sreckosojic@gmail.com', '$2a$12$Sq4FY/lbMBjjUXAdn.PTUe8cQjCNTXHeNTgJGlmicIQEyVcxdOZ/u', 'Srecko', 'Sojic', 'Filipa Visnjica 2g', 'Novi Sad', 'Srbija', '+3815324984','Voleo bih da budem kapetan na belu ladju', 0, '2009-04-08 08:37:22.508-07', true, false, 0)
INSERT INTO ROLE (name) VALUES ('ROLE_ADMIN');
INSERT INTO ROLE (name) VALUES ('ROLE_CLIENT');
INSERT INTO ROLE (name) VALUES ('ROLE_INSTRUCTOR');
INSERT INTO ROLE (name) VALUES ('ROLE_LODGE_OWNER');
INSERT INTO ROLE (name) VALUES ('ROLE_SHIP_OWNER');

INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1); -- marku dodeljujemo rolu ADMIN
INSERT INTO USER_ROLE (user_id, role_id) VALUES (2, 2); -- nikoli dodeljujemo rolu CLIENT
INSERT INTO USER_ROLE (user_id, role_id) VALUES (3, 4); -- ognjenu dodeljujemo rolu LODGE_OWNER
INSERT INTO USER_ROLE (user_id, role_id) VALUES (4, 3); -- luki dodeljujemo rolu INSTRUCTOR
INSERT INTO USER_ROLE (user_id, role_id) VALUES (5, 5); -- srecku dodeljujemo rolu SHIP_OWNER
INSERT INTO SERVICE_SIGNUP_REQUEST (user_id, signup_explanation, status) VALUES (3, 'volio bih bit lodge owner', 1)
INSERT INTO SERVICE_SIGNUP_REQUEST (user_id, signup_explanation, status) VALUES (4, 'volio bih jako bit instrrr pecanja', 0)

INSERT INTO public.reservation_entity ( average_rating, deleted, description, name, owner_id, reservation_entity_type, rules_of_conduct) VALUES ( 0, false, 'neki promo opis', 'Pecanje 1o1', 4, 2, '#pravilo ponasanja 1#pravilo ponasanja 2');
INSERT INTO public.reservation_entity ( average_rating, deleted, description, name, owner_id, reservation_entity_type, rules_of_conduct) VALUES ( 0, false, 'Ima neki tekst', 'Kuca u bg', 3, 0, '#Svasta');

INSERT INTO public.fishing_lesson (cancellation_percentage, capacity, fishing_kit, id) VALUES (12, 5, '#pecaljke#mreza', 1);

INSERT INTO public.service ( info, price, type, reservation_entity_id) VALUES ( 'pecanje', 20, 0, 1);
INSERT INTO public.service ( info, price, type, reservation_entity_id) VALUES ( 'dodatna usluga 2', 13, 1, 1);
INSERT INTO public.service ( info, price, type, reservation_entity_id) VALUES ( 'dodatna usluga 1', 10, 1, 1);
INSERT INTO public.service ( info, price, type, reservation_entity_id) VALUES ( 'Nocenje', 10, 0, 2);

INSERT INTO public.free_period ( end_date, start_date, reservation_entity_id) VALUES ( '2022-06-30 02:00:00', '2022-06-01 02:00:00', 2);

INSERT INTO public.location (address, city, country, latitude, longitude, reservation_entity_id) VALUES ('Beogradski kej 47', 'Novi Sad', 'SRB', 45.26208, 19.8565, 1);
INSERT INTO public.location ( address, city, country, latitude, longitude, reservation_entity_id) VALUES ( 'Zitni trg 11', 'Novi Sad', 'SRB', 45.258677, 19.8363, 2);

INSERT INTO public.lodge (double_bedroom_number, four_bedroom_number, single_bedroom_number, id) VALUES (1, 0, 1, 2);

INSERT INTO public.reservation (app_percentage, captain, discount, end_date, max_person_number, owner_id, price, reservation_entity_id, start_date, user_id) VALUES (20, false, 5, '2022-05-18 02:00:00', null, 4, 0, 1, '2022-05-16 02:00:00', 2);