import express from 'express';
import passport from 'passport'
import { config } from "dotenv";
import { createTable, truncatetable } from "./config/tables";
import client from './config/dbconnect'
import allRoute from "./routes";
client.connect();
config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
app.use('/api/v1', allRoute)
app.get('/', (req, res) => {
    res.status(200).send(
        {
            status: 200,
            message: "the todo app is working"
        }
    )
});
app.use((req, res) => res.status(404).send({
    status: 404,
    error: 'PAGE NOT FOUND',
}));
app.listen(PORT, () => {
    createTable();
    if (process.env.NODE_ENV == 'test') {
        truncatetable();
    }
    console.log(`TODO app listening on port ${PORT}!`);
});
export default app;
