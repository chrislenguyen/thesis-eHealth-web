const queryForObject = require("./queryForObject.js");
const fs = require("fs");

const queryGetDeviceStatus = (callback) => {
	fs.readFile(
		"src/models/sql/queryGetDeviceStatus.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
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

module.exports = queryGetDeviceStatus;
