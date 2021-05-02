const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryAddBuilding = ({ hosId, bCd }, callback) => {
	fs.readFile(
		"src/models/sql/queryAddBuilding.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			console.log(hosId, bCd);
			query = query.replace("&hosId", mysql.escape(hosId));
			query = query.replace("&bCd", mysql.escape(bCd));
			console.log(query);
			queryForObject(query, (err, data) => {
				if (err) {
					return console.log("ERROR QUERY ADD BUILDING");
				} else {
					callback(data);
				}
			});
		}
	);
};

module.exports = queryAddBuilding;
