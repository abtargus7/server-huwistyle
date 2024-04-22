import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("Hello User");
})

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));