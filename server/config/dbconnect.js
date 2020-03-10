import { Client } from 'pg';
import { config } from 'dotenv';
config();

const client = new Client(process.env.DATABASE_URL);
console.log(client.query)
export default client;
