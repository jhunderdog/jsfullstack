const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');


router.get('/login', (req, res, next) => {
    res.render('Login');
});

router.get('/register', (req, res, next) => {
    res.render('Register');
});

router.post('/register', (req, res, next) => {
    // console.log(req.body);
    // res.send('hello');
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please Fill in all fields'});
    }
    
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }

    if (password.length <6) {
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    if (errors.length >0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email already exists' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    console.log(newUser);
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success msg',
                                        'You are now registered and can login'
                                    );
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        });
                    })
                }
            })
    }
});

module.exports = router;