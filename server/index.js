import express from 'express';

const app = express();
const PORT= process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Champs To do App!');
});

app.listen(PORT, () => console.log(`TODO app listening on port ${PORT}!`));