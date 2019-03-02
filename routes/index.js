const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // res.send('Welcome');
    res.render('welcome');
});

// router.get('/dashboard', (req, res, next) => {
//     res.render('dashboard', {
//         name: req.user.name
//     })
// })
module.exports = router;