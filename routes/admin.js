const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

router.delete('/delete/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await Entry.findByIdAndDelete(id);
        res.redirect('/admin');
    }catch(err){
        console.log(err);
        res.render('home/error');
    }
});

router.get('/confirm/delete/:id', (req, res) => {
    const { id } = req.params;
    res.render('admin/confirm', { id });
});

router.patch('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, password } = req.body;
        if(password == process.env.PASSWORD){
            const entry = await Entry.findByIdAndUpdate(id, {
                title: title,
                description: description
            }, { new: true });
            res.redirect('/admin');
        }else{
            console.log('Wrong Password!');
            res.render('home/error');
        }
    } catch (err) {
        console.log(err);
        res.render('home/error');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Entry.findById(id);
        res.render('admin/edit', { entry });
    } catch (err) {
        console.log(err);
        res.render('home/error'); 
    }
})

router.post('/add', async (req, res) => {
    try {
        const { title, description, password } = req.body;
        if(password === process.env.PASSWORD){
            let entry = await Entry.create({
                title: title,
                description: description
            });
            res.redirect('/admin');
        }else{
            console.log('Wrong Password!');
            res.render('/home/error');
        }
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