const mysql = require('mysql2');

const connection = mysql.createConnection({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

const viewAll = (req, res) => {
	connection.query('SELECT * FROM user', (err, rows) => {
		if (!err) {
			const removedUserMsg = req.query.removed;
			res.render('home', { rows, removedUserMsg });
		} else {
			console.log(err);
		}
	});
};

const find = (req, res) => {
	const searchTerm = req.body.search;
	connection.query(
		'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',
		['%' + searchTerm + '%', '%' + searchTerm + '%'],
		(err, rows) => {
			if (!err) {
				res.render('home', { rows });
			} else {
				console.log(err);
			}
		}
	);
};

const addForm = (req, res) => {
	res.render('add-user');
};

const add = (req, res) => {
	const { first_name, last_name, email, phone, comments } = req.body;
	connection.query(
		'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? ',
		[first_name, last_name, email, phone, comments],
		(err, rows) => {
			if (!err) {
				res.render('add-user', { rows, alert: 'User added succesfully' });
			} else {
				console.log(err);
			}
		}
	);
};

const editForm = (req, res) => {
	const { id } = req.params;
	connection.query('SELECT * FROM user WHERE id = ?', [id], (err, user) => {
		if (!err) {
			res.render('edit-user', { user });
		} else {
			console.log(err);
		}
	});
};

const update = (req, res) => {
	const { first_name, last_name, email, phone, comments } = req.body;
	connection.query(
		'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?',
		[first_name, last_name, email, phone, comments, req.params.id],
		(err, user) => {
			if (!err) {
				connection.query(
					'SELECT * FROM user WHERE id = ?',
					[req.params.id],
					(err, user) => {
						if (!err) {
							res.render('edit-user', {
								user,
								alert: `The information of "${first_name} ${last_name}" (id n° ${req.params.id}) has been updated`,
							});
						} else {
							console.log(err);
						}
					}
				);
			} else {
				console.log(err);
			}
		}
	);
};

const remove = (req, res) => {
	connection.query(
		'DELETE FROM user WHERE id = ?',
		[req.params.id],
		(err, rows) => {
			if (!err) {
				const removeSuccesMsg = encodeURIComponent(
					`User with id: ${req.params.id} removed succesfully`
				);
				res.redirect(`/?removed=${removeSuccesMsg}`);
			} else {
				console.log(err);
			}
		}
	);
};

module.exports = { viewAll, find, add, addForm, editForm, update, remove };
