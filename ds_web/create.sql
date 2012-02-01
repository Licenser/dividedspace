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
       script_id integer REFERENCES scripts(id));

CREATE TABLE modules (
       id SERIAL PRIMARY KEY,
       user_id integer REFERENCES users(id) ON DELETE CASCADE,
       ship_id integer REFERENCES shiptypes(id),
       name varchar(64));

CREATE TABLE fleets (
       id SERIAL PRIMARY KEY,
       user_id integer REFERENCES users(id) ON DELETE CASCADE,
       name varchar(64));

CREATE TABLE fleet_shiptype (
       id SERIAL PRIMARY KEY,       
       fleet_id integer REFERENCES fleets(id) ON DELETE CASCADE ,
       count integer DEFAULT 1,
       shiptype_id integer REFERENCES shiptypes(id) ON DELETE CASCADE);

CREATE INDEX fleet_id_idx ON fleet_shiptype (fleet_id);

       
SELECT shiptypes.id, shiptypes.name, fleet_shiptype.count FROM fleets JOIN fleet_shiptype ON (fleet_shiptype.fleet_id = fleets.id) JOIN shiptypes ON (shiptypes.id = fleet_shiptype.shiptype_id);
