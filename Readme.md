Take Home Challenge

The project is build with Node and Postgres

Steps to run project:
- 1- Have a postgres database with a table called "part" and the structure as the one in the challenge
- 2- Connect the db creating a .env file in /take_home and following the .env_example as a template
    - DB_HOST=
    - DB_NAME=
    - DB_PASSWORD=
    - DB_PORT=
    - DB_USER=
    - PORT=
- 3- In /take_home run the following commands:
    - yarn
    - yarn start ==> This will start the API locally in the selected PORT
- 4- Run tests if needed
    - I added some unit test to show an easy implementation of testing
    - To run it ==> yarn test

In the project folder, i also added a POSTMAN collection with the API Endpoints

SQL to populate Postgres DB:

CREATE TABLE part (
  id SERIAL,
  name VARCHAR(150),
  sku VARCHAR(30),
  description VARCHAR(1024),
  weight_ounces INTEGER,
  is_active INTEGER
);

INSERT INTO part (name, sku, description, weight_ounces, is_active) VALUES
('Heavy coil', 'SDJDDH8223DHJ', 'Tightly wound nickel-gravy alloy spring', 22, 1),
('Reverse lever', 'DCMM39823DSJD', 'Attached to provide inverse leverage', 9, 0),
('Macrochip', 'OWDD823011DJSD', 'Used for heavy-load computing', 2, 1);

