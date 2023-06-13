const express = require('express')

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello i am live")
})

const start = async () => {
    try {
        app.listen(PORT,() => {
            console.log(`server is runing on ${PORT}`)
        })
    } catch (error) {
    console.log(error)
    }
}

start() 