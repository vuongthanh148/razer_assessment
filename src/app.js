const express = require("express")
const bodyParser = require('body-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')

const app = express()


app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(xss())

app.get('/health', function (req, res) {
    res.send("Service is up!!!")
})

app.listen(3000, function () {
    console.log("SERVER STARTED ON localhost:3000")
})
