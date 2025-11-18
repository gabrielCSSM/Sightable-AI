-- Por si se comete alguna metepatez
DROP TABLE IF EXISTS loggedUsers;
DROP TABLE IF EXISTS guestUsers;
DROP TABLE IF EXISTS pendingUsers;

-- Extension necesaria para el hasheo y gestion de este
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabla usuarios noramales.
CREATE TABLE if NOT EXISTS loggedUsers(id BIGINT GENERATED ALWAYS AS IDENTITY, email VARCHAR(320) UNIQUE, password VARCHAR(132) not null);
-- Tabla usuarios invitados.
CREATE TABLE if NOT EXISTS guestUsers(id BIGINT GENERATED ALWAYS AS IDENTITY, email VARCHAR(320) UNIQUE, characteristic VARCHAR(320), remaining_uses SMALLINT not null);
-- Tabla usuarios pendientes.
CREATE TABLE if NOT EXISTS pendingUsers(id BIGINT GENERATED ALWAYS AS IDENTITY, email VARCHAR(320) UNIQUE, password VARCHAR(132) not null, validation_code VARCHAR(8) not null,validated BOOLEAN not null);
-- Datos de prueba
INSERT INTO loggedUsers(email, password) VALUES ('test@sightable.ai',  crypt('test123.', gen_salt('sha256crypt')));

INSERT INTO guestusers (email, characteristic, remaining_uses) VALUES ('guest12345678@sightable.ai', 'Something characteristic', 3);
INSERT INTO guestusers (email, characteristic, remaining_uses) VALUES ('guest87654321@sightable.ai', 'Something characteristic', 1);
INSERT INTO guestusers (email, characteristic, remaining_uses) VALUES ('guest11223344@sightable.ai', 'Something characteristic', 2);
