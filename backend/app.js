const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const createError = require('http-errors');
const authApi = require('./Routes/Auth.route');
require('./Helper/Redis.helper');
const cors = require('cors');
const usrApi = require('./Routes/KYC.route');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(multer().any());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));  

app.use('/auth', authApi);
app.use('/usr', usrApi);

app.get('/', (req, res, next) => {
    res.send('App is running');
})

app.use(async (req, res, next) => {
    next(createError.NotFound());
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));