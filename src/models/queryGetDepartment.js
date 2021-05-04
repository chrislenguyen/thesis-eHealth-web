const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryGetDepartment = ({ hosId }, callback) => {
	fs.readFile(
		"src/models/sql/queryGetDepartment.sql",
		"utf8",
		(loadFileErr, query) => {
			//TODO: HANDLE LOAD FILE ERROR
			query = query.replace("&hosId", mysql.escape(hosId));
			// console.log(query);
			queryForObject(query, (err, data) => {
				if (err) {
					callback(err, undefined);
				} else {
					callback(undefined, data);
				}
			});
		}
	);
};

module.exports = queryGetDepartment;
