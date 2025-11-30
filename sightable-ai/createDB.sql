-- Por si se comete alguna metepatez
DROP TABLE IF EXISTS loggedUsers;
DROP TABLE IF EXISTS guestUsers;
DROP TABLE IF EXISTS pendingUsers;

-- Extension necesaria para el hasheo y gestion de este
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabla usuarios noramales.
CREATE TABLE if NOT EXISTS loggedUsers(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, email VARCHAR(320) UNIQUE, password VARCHAR(132) not null, files_processed BIGINT NOT NULL, summaries_made BIGINT NOT NULL);
-- Tabla usuarios invitados.
CREATE TABLE if NOT EXISTS guestUsers(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, email VARCHAR(320) UNIQUE, characteristic VARCHAR(320), remaining_uses SMALLINT not null);
-- Tabla usuarios pendientes.
CREATE TABLE if NOT EXISTS pendingUsers(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, email VARCHAR(320) UNIQUE, password VARCHAR(132) not null, validation_code VARCHAR(8) not null,validated BOOLEAN not null);

CREATE TABLE IF NOT EXISTS user_notes(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES loggedUsers(id) ON DELETE CASCADE
);

-- Tabla de resúmenes de usuario
CREATE TABLE IF NOT EXISTS user_summaries(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    summary_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES loggedUsers(id) ON DELETE CASCADE
);
-- Datos de prueba
INSERT INTO loggedUsers(email, password, files_processed, summaries_made) VALUES ('admin@sightable.ai',  crypt('adminadmin.', gen_salt('sha256crypt')), 0, 0);

INSERT INTO guestusers (email, remaining_uses) VALUES ('guest12345678@sightable.ai', 3);
INSERT INTO guestusers (email, remaining_uses) VALUES ('guest87654321@sightable.ai', 1);
INSERT INTO guestusers (email, remaining_uses) VALUES ('guest11223344@sightable.ai', 2);
