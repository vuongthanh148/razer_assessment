const express = require("express")
const bodyParser = require('body-parser')
const app = express()

app.get('/health', function (req, res) {
    res.send("Service is up!!!")
})

app.listen(3000, function () {
    console.log("SERVER STARTED ON localhost:3000")
})
