const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryForDoctor = (username, callback) => {
	fs.readFile(
		"src/models/sql/queryDoctorInfo.sql",
		"utf8",
		(loadFileErr, query) => {
			query = query.replace("&username", mysql.escape(username));
			// console.log(query);
			queryForObject(query, (err, data) => {
				if (err) {
					callback(err, undefined);
				} else {
					callback(undefined, data[0]);
				}
			});
		}
	);
};

module.exports = queryForDoctor;
