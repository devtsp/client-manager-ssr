require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 5000;
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
// Static files
app.use(express.static('public'));
// Templating engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
// Connection Pool
const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});
// DB Connection
pool.getConnection((err, connection) => {
	if (err) {
		throw err;
	} else {
		console.log(`Connected to DB with ID: ${connection.threadId}`);
	}
});
// Router
app.get('', (req, res) => {
	res.render('home');
});

app.listen(port, () => console.log('Listening on port ' + port));
