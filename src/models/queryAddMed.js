const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryAddMed = (data, callback) => {
	fs.readFile(
		"src/models/sql/queryAddMed.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			query = query.replace("&data", data);
			queryForObject(query, (err, data) => {
				if (err) {
					return console.log("ERROR QUERY ADD MEDICATION");
				}
				// console.log(data);
				callback(data);
			});
		}
	);
};

module.exports = queryAddMed;
