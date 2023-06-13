const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = require('./db/connect')

// connect return promise 
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL); //will to connect.js file 
        app.listen(PORT,() => {
            console.log(`server is runing on ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
