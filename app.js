require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// Parsing Middleware application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log('Listening on port ' + port));
