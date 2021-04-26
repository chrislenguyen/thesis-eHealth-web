const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const fs = require("fs");

const queryAddHospital = (
	{ hosNameAddHosForm, hosAddressAddHosForm },
	callback
) => {
	fs.readFile(
		"src/models/sql/queryAddHospital.sql",
		"utf8",
		(loadFileErr, query) => {
			if (loadFileErr) {
				return console.log(loadFileErr);
			}
			query = query.replace(
				"hosNameAddHosForm",
				mysql.escape(hosNameAddHosForm)
			);
			query = query.replace(
				"hosAddressAddHosForm",
				mysql.escape(hosAddressAddHosForm)
			);
			queryForObject(query, (err, data) => {
				if (err) {
					return console.log(err);
				}
				// console.log(data);
				callback(data);
			});
		}
	);
};

module.exports = queryAddHospital;
