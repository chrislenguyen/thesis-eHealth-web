const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryGetRoom = ({ hosId, bCd }, callback) => {
	fs.readFile(
		"src/models/sql/queryGetRoom.sql",
		"utf8",
		(loadFileErr, query) => {
			query = query.replace("&hosId", mysql.escape(hosId));
			query = query.replace("&bCd", mysql.escape(bCd));
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

module.exports = queryGetRoom;
