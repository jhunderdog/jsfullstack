const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('Login');
});

router.get('/register', (req, res, next) => {
    res.render('Register');
});

module.exports = router;