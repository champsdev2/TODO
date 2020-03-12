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
        title VARCHAR(25) NOT NULL,
        description VARCHAR(5000) NOT NULL,
        scope VARCHAR(25) NOT NULL ,
        status boolean NOT NULL,
        ownerid integer,
        assigneeid integer DEFAULT NULL,
        createdon date NOT NULL,
        modifiedon date NOT NULL
        );
    `);
}
export const truncatetable = () => {
    client.query('TRUNCATE TABLE users CASCADE');
}
