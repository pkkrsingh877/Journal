const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// middlewares
app.use(morgan('dev'));
app.use(express.static('./public'));

//setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log('The app is running at port ', PORT);
});