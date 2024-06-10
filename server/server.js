const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 1234;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', require('./routes/userRoute'))
app.use('/posts', require('./routes/postRoute'))
app.get('/test', (req, res) => {
    res.sendStatus(200)
})

app.all('*', (req, res) => {
    res.status(404).json({message: 'No Endpoint Found'});
})

app.listen(PORT, (error) =>{
    mongoose.connect('mongodb+srv://dbUser:cs110@main.gt87fte.mongodb.net/final-project').then(() => {
        console.log("MongoDB connection started")
    })
    if(!error)
        console.log("Server is running, and is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);