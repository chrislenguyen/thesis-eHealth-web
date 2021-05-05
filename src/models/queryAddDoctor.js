const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const md5 = require("md5");

const queryAddDoctor = (data, callback) => {
	const query =
		"EXECUTE hospital.Add_Doctor " +
		"N" +
		mysql.escape(data.fName) +
		"," +
		"N" +
		mysql.escape(data.lName) +
		"," +
		mysql.escape(data.birthDate) +
		"," +
		mysql.escape(data.gender) +
		"," +
		"N" +
		mysql.escape(data.addr) +
		"," +
		mysql.escape(data.phone) +
		"," +
		mysql.escape(data.ssn) +
		"," +
		"N" +
		mysql.escape(data.spec) +
		"," +
		mysql.escape(data.gradTime) +
		"," +
		"1" +
		"," +
		mysql.escape(data.username) +
		"," +
		mysql.escape(md5(data.password)) +
		"," +
		mysql.escape(data.email) +
		"," +
		mysql.escape(data.hos) +
		"," +
		mysql.escape(data.dep) +
		",1";
	queryForObject(query, (err, data) => {
		if (err) {
			return console.log("ERROR QUERY ADD DOCTOR");
		}
		callback(data);
	});
};

module.exports = queryAddDoctor;
