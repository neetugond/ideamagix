require("dotenv").config({ path: "./config/config.env" });
const express = require('express');


const connectDB = require("./db/connect");
const auth = require("./middlewares/auth");
const app = express();

// middlewares
app.use(express.json());
app.use(require("cors")());


// routes
app.get('/protected', auth, (req, res) => {
    return res.status(200).json({user:req.user})
})
app.use("/api", require("./routes/auth"));

// connect return promise 
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL); //will to connect.js file 
        app.listen(PORT, () => {
            console.log(`server is runing on ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
