const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Entry = require('./models/entry');
require('dotenv').config();

// middlewares
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(methodOverride('_method'));
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

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Entry.findById(id);
        res.render('home/view', { entry });
    } catch (err) {
        res.render('home/error');
    }
})

app.get('/', async (req, res) => {
    const entries = await Entry.find({});
    res.render('home/index', { entries });
});

app.listen(PORT, () => {
    console.log('The app is running at port', PORT);
});