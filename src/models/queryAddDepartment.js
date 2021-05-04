const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryAddDepartment = ({ hosId, departmentName }, callback) => {
	fs.readFile(
		"src/models/sql/queryAddDepartment.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			query = query.replace("&hosId", mysql.escape(hosId));
			query = query.replace(
				"&departmentName",
				mysql.escape(departmentName)
			);
			console.log(query);
			queryForObject(query, (err, data) => {
				if (err) {
					return console.log(err);
				}
				// console.log(data);
				callback(data);
			});
		}
	);
};

module.exports = queryAddDepartment;
