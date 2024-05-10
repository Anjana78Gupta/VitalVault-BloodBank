const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const user = require('../models/user');
const passport = require('passport');
const router = express.Router();

router.get('/register', (req, res) => {
    res.send('register');
})
router.post('/register', async (req, res) => {
    try {
        const { email, username, password, role, address, phonenumber } = req.body;
        const user = new User({ email, username, role, address, phonenumber });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            res.send('done!')
        });
        console.log(registeredUser);
        res.send(registeredUser);
    } catch (e) {
        console.log('error', e);
    }
});
router.get('/login', (req, res) => {
    res.send('login');
    console.log('Login!');
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    res.send('Login Success');
    console.log('Login');
})
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "You logged Out Successfully!!");
        res.redirect('/blogs');
    });
})
module.exports = router;