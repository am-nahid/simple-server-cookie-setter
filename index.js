const express = require('express')
const dotenv = require("dotenv")
const cors = require("cors")
const route = require('./routes/routes')
const connectToDb = require('./config/config')

const port = 8040
dotenv.config()

const app = express()
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "abc.com" : "http://localhost:3000",
    credentials:true
}))


app.use('/user',route)

app.get('/',(req,res)=>{

    res.send({
        message: "working fine"
    })
})

app.listen(port ,async()=>{
    await connectToDb()
    console.log(`Site is up and running on port ${port}`);
})