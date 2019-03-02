const express = require('express');
const expressejsLayouts = require('express-ejs-layouts');
const app = express();
app.use(expressejsLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

