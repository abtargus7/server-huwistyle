import express, { Router } from 'express';
import connectDB from './db/index.js';
import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 4000;






connectDB()
.then(
    app.listen(PORT, () => console.log(`The server is running on ${PORT}`))
)
.catch( (err) => console.log("MONGODB CONNECTION FAILED!!! ", err));
