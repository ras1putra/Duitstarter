const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));  

app.use('/auth', require('./src/routes/auth/route'));

app.get('/', (req, res, next) => {
    res.send('App is running');
})

app.use(async (req, res, next) => {
    next(createError.NotFound());
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));