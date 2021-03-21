const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryAddMed = ({ pId, exId, des, medName, quantity } = {}, callback) => {
	var query =
		"DECLARE @return_status INT; " +
		"EXEC hospital.Add_Medication " +
		"@Patient_ID = " +
		mysql.escape(pId) +
		"," +
		"@Exam_ID = " +
		mysql.escape(exId) +
		"," +
		"@Med_Name = " +
		mysql.escape(medName) +
		"," +
		"@Amount = " +
		mysql.escape(quantity) +
		"," +
		"@Description = " +
		mysql.escape(des) +
		"," +
		"@para_out = @return_status OUTPUT;";
	// console.log(query);
	queryForObject(query, (err, data) => {
		callback(data);
	});
};

module.exports = queryAddMed;
