CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name varchar(40),
       pass char(32),
       rights integer DEFAULT 0,
       UNIQUE(name));

CREATE TABLE scripts (
       id SERIAL PRIMARY KEY,
       name varchar(64), 
       code text,
       user_id integer REFERENCES users(id) ON DELETE CASCADE,
       (id));

CREATE TABLE shiptypes (
       id SERIAL PRIMARY KEY,
       user_id integer REFERENCES users(id) ON DELETE CASCADE,
       name varchar(64),
       script_id integer REFERENCES scripts(id))

CREATE TABLE modules (
       id SERIAL PRIMARY KEY,
       user_id integer REFERENCES users(id) ON DELETE CASCADE,
       ship_id integer REFERENCES shiptypes(id),
       name varchar(64))


INSERT INTO shiptypes (user_id) VALUES (1) RETURNING id