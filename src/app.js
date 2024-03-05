import express from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'
import { jwtStrategy } from './config/passport.js'


export const app = express()

// set security HTTP headers
app.use(helmet())
// parse json request body
app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())
app.use(mongoSanitize());

// gzip compression
app.use(compression());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/health', function (req, res) {
    res.send("Service is up!!!")
})

app.listen(3000, function () {
    console.log("SERVER STARTED ON localhost:3000")
})
