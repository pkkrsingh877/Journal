const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

router.post('/add', async (req, res) => {
    try {
        const { title, description } = req.body;
        let entry = await Entry.create({
            title: title,
            description: description
        });
        res.redirect('/admin');
    } catch (err) {
        console.log(err);
        res.redirect('/admin/add');
    }
});

router.get('/add', (req, res) => {
    res.render('admin/add');
});

router.get('/', async (req, res) => {
    const entries = await Entry.find({});
    res.render('admin/index', { entries });
});

module.exports = router;