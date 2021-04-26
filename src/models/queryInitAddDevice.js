const queryForObject = require("./queryForObject.js");
const fs = require("fs");

const queryInitAddDevice = (callback) => {
	fs.readFile(
		"src/models/sql/queryHospitalBuilding.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
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

module.exports = queryInitAddDevice;
