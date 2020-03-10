import client from "./dbconnect";

export const createTable = () => {
    client.query(`
            CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            email varchar(30)  NOT NULL UNIQUE,
            names varchar(25)  NOT NULL,
            password varchar(10000)  NOT NULL,
            createdon date NOT NULL
        );
    `);
    client.query(`
        CREATE TABLE IF NOT EXISTS tasks(
        id SERIAL PRIMARY KEY,
        title VARCHAR(25) NOT NULL UNIQUE,
        description VARCHAR(5000) NOT NULL UNIQUE,
        scope VARCHAR(25) NOT NULL UNIQUE,
        status VARCHAR(10) NOT NULL,
        ownerid integer,
        assigneeid integer,
        createdon date NOT NULL,
        modifiedon date NOT NULL
        );
    `);
}
