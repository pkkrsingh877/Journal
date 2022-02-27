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
app.use(express.urlencoded({ extended: false }));
//setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// setting up mongoose
try {
    mongoose.connect('mongodb://localhost:27017/journal');
    console.log('DB CONNECTION SUCCESSFUL!');
} catch (err) {
    console.log('DB CONNECTION FAILED!', err);
}

// setting routes up

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('home/index');
});

app.listen(PORT, () => {
    console.log('The app is running at port', PORT);
});