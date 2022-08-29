// IMPORTS
const express = require("express");
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// GET ROUTES
// register page
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// login page
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// POST ROUTES
// create new user
router.post('/register', async (req, res) => {
    try {
        const foundUser = await db.User.exists({ email: req.body.email});
        if (foundUser) {
            return res.redirect('/login');
        }

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const newUser = await db.User.create(req.body);
        res.redirect('/login');
    } catch(err) {
        console.log(err);
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (!foundUser) {
            return res.redirect('/register');
        }

        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) {
            return res.send('password invalid')
        }

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username
        };

        return res.redirect('/posts');
    } catch(err) {
        console.log(err);
    }
});

// EXPORT ROUTER
module.exports = router;