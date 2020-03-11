import express from 'express';
import { config } from "dotenv";
import { createTable } from "./config/tables";
import client from './config/dbconnect'
client.connect();
config();
const app = express();
const PORT= process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(
        {
            status : 200 ,
            message : "the todo app is working"
        }
    )
});

app.listen(PORT, () =>{
    createTable();
    console.log(`TODO app listening on port ${PORT}!`);
});
export default app;
