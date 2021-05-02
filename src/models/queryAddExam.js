const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryAddExam = (
	{ pId, nextExamDate, diagnose, sId, docId, hosId, examDate } = {},
	callback
) => {
	var query =
		"DECLARE @return_status INT; " +
		"EXEC hospital.Add_Examination " +
		"@Patient_ID = " +
		mysql.escape(pId) +
		" ," +
		"@Exam_Date = " +
		mysql.escape(examDate) +
		" ," +
		"@Next_Exam_Date = " +
		(nextExamDate ? mysql.escape(nextExamDate) : "null") +
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
	queryForObject(query, (err, data) => {
		if (err) {
			return console.log('ERROR QUERY ADD EXAM');
		}
		callback(data);
	});
	// callback(1);
};
module.exports = queryAddExam;
