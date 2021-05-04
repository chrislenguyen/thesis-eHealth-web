const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryAddRoom = ({ hosId, bCd, roomCd }, callback) => {
	fs.readFile(
		"src/models/sql/queryAddRoom.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			var insertData = "";
			insertData += "(";
			insertData += mysql.escape(hosId);
			insertData += ",";
			insertData += mysql.escape(bCd);
			insertData += ",";
			insertData += mysql.escape(roomCd);
			insertData += ")";
			query = query.replace("&data", insertData);
			console.log(query);
			queryForObject(query, (err, data) => {
				if (err) {
					return console.log("ERROR QUERY ADD ROOM");
				} else {
					callback(data);
				}
			});
		}
	);
};

module.exports = queryAddRoom;
