const express = require('express');
const expressejsLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then( () => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
    
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(expressejsLayouts);
app.set('view engine', 'ejs');
//Express body parser
app.use(express.urlencoded({ extended:true }));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

