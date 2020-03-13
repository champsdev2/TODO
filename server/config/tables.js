import client from "./dbconnect";

export const createTable = () => {
    client.query(`
            CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            email varchar(100)  NOT NULL UNIQUE,
            names varchar(250)  NOT NULL,
            avatar varchar(250)  NOT NULL,
            password varchar(250),
            oauthId varchar(250),
            createdon date NOT NULL,
            modifiedon date NOT NULL
        );
    `);
    client.query(`
        CREATE TABLE IF NOT EXISTS tasks(
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(500) NOT NULL,
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
