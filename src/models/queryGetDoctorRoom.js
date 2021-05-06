const queryForObject = require("./queryForObject.js");
const mysql = require("mysql");
const fs = require("fs");

const queryGetDoctorRoom = ({ hosId, depId }, callback) => {
	fs.readFile(
		"src/models/sql/queryGetDoctorRoom.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			query = query.replace("&hosId", mysql.escape(hosId));
			query = query.replace("&depId", mysql.escape(depId));
			queryForObject(query, (err, data) => {
				// console.log(data);
				if (err) {
					callback(err, undefined);
				} else {
					callback(undefined, data);
				}
			});
		}
	);
};

module.exports = queryGetDoctorRoom;
