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

CREATE TABLE ship_types (
       id SERIAL PRIMARY KEY,
       user_id integer REFERENCES users(id) ON DELETE CASCADE,
       name varchar(64),
       script_id integer NOT NULL);
