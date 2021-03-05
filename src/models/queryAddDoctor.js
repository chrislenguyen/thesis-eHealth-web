const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryAddDoctor = (data, callback) => {
	const query =
		"EXECUTE hospital.Add_Doctor" +
		mysql.escape(data.fName) +
		"," +
		mysql.escape(data.lName) +
		"," +
		mysql.escape(data.birthDate) +
		"," +
		mysql.escape(data.gender) +
		"," +
		mysql.escape(data.addr) +
		"," +
		mysql.escape(data.phone) +
		"," +
		mysql.escape(data.ssn) +
		"," +
		mysql.escape(data.spec) +
		"," +
		mysql.escape(data.gradTime) +
		"," +
		"1" +
		"," +
		mysql.escape(data.username) +
		"," +
		mysql.escape(data.password) +
		"," +
		mysql.escape(data.email) +
		"," +
		mysql.escape(data.hos) +
		"," +
		mysql.escape(data.dep) +
		"," +
		1;
	queryForObject(query, (err, data) => {
		if (data < 0) {
			console.log("error");
		} else {
			console.log("success");
		}
	});
};

module.exports = queryAddDoctor;
