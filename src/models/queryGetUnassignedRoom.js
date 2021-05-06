const queryForObject = require("./queryForObject.js");
const mysql = require("mysql");
const fs = require("fs");

const queryGetUnassignedRoom = ({ hosId }, callback) => {
	fs.readFile(
		"src/models/sql/queryGetUnassignedRoom.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			query = query.replace("&hosId", mysql.escape(hosId));
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

module.exports = queryGetUnassignedRoom;
