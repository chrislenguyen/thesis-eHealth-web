const mysql = require("mysql");
const queryForObject = require("./queryForObject.js");
const md5 = require("md5");

const queryForAuthentication = (username, password, callback) => {
	const query =
		"select * from hospital.privilege where username = " +
		mysql.escape(username) +
		"and password = " +
		mysql.escape(md5(password)) +
		" for json auto"; // with md5
	// mysql.escape(password);	// no md5
	// console.log(query);
	queryForObject(query, (err, data) => {
		// console.log(data);
		if (err) {
			// console.log(err);
			// console.log(data);
			callback(err, undefined);
		} else {
			// console.log(data);
			data !== undefined
				? callback(undefined, data[0])
				: callback(undefined, undefined);
		}
	});
};

module.exports = queryForAuthentication;
