const queryForObject = require("./queryForObject.js");
const mysql = require("mysql");
const fs = require("fs");

const queryAssignDoctor = ({ bCd, roomCd, doctorId }, callback) => {
	fs.readFile(
		"src/models/sql/queryAssignDoctor.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			query = query.replace("&bCd", mysql.escape(bCd));
			query = query.replace("&roomCd", mysql.escape(roomCd));
			query = query.replace("&doctorId", mysql.escape(doctorId));
			queryForObject(query, (err, data) => {
				if (err) {
					return console.log("ERROR QUERY ASSIGN DOCTOR");
				}
				callback(data);
			});
		}
	);
};

module.exports = queryAssignDoctor;
