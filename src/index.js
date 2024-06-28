import express, { Router } from 'express';
import connectDB from './db/index.js';
import "dotenv/config";
import { app } from './app.js';

const PORT = process.env.PORT || 4000;






connectDB()
.then(
    app.listen(PORT, () => console.log(`The server is running on ${PORT}`))
)
.catch( (err) => console.log("MONGODB CONNECTION FAILED!!! ", err));
