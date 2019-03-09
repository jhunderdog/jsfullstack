const express = require('express');
const expressejsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
require('./config/passport')(passport);



const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then( () => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
}); 

app.use(expressejsLayouts);
app.set('view engine', 'ejs');
//Express body parser
app.use(express.urlencoded({ extended:true }));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

