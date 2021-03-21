const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryAddExam = (
	{ pId, nextExamDate, diagnose, sId, docId, hosId } = {},
	callback
) => {
	var query =
		"DECLARE @return_status INT; " +
		"EXEC hospital.Add_Examination " +
		"@Patient_ID = " +
		mysql.escape(pId) +
		" ," +
		"@Exam_Date = " +
		mysql.escape(nextExamDate) +
		" ," +
		"@Diagnosis = " +
		mysql.escape(diagnose) +
		" ," +
		"@Sensor_ID = " +
		mysql.escape(sId) +
		" ," +
		"@Doctor_ID = " +
		mysql.escape(docId) +
		" ," +
		"@Hospital_ID = " +
		mysql.escape(hosId) +
		" ," +
		"@para_out = @return_status OUTPUT; ";
	// console.log(query);
	queryForObject(query, (err, data) => {
		callback(data);
	});
};
module.exports = queryAddExam;
