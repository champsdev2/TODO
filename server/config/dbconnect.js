import { Client } from 'pg';
import { config } from 'dotenv';
config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  } 
});
console.log(client.query)
export default client;
