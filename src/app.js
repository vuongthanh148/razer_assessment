import compression from 'compression'
import cors from 'cors'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import httpStatus from 'http-status'
import passport from 'passport'
import morgan from './config/morgan.js'
import { jwtStrategy } from './config/passport.js'
import router from './routes/v1/index.route.js'
import { ApiError } from './utils/ApiError.js'
export const app = express()

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet())
// parse json request body
app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
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

app.use('/api/v1', router)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
