require('dotenv').config();
const port = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log('Listening on port ' + port));
