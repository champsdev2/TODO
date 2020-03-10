import express from 'express';
import { config } from "dotenv";
import { createTable } from "./config/tables";
config();
const app = express();
const PORT= process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Champs To do App!');
});

app.listen(PORT, () =>{
    createTable();
    console.log(`TODO app listening on port ${PORT}!`);
});
