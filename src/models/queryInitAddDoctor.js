const queryForObject = require("./queryForObject");
const fs = require("fs");

const queryInitAddDoctor = (callback) => {
	fs.readFile(
		"src/models/sql/queryHospitalDepartment.sql",
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

module.exports = queryInitAddDoctor;
