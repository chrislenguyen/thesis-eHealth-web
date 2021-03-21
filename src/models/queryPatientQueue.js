const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryPatientQueue = (buildingCd, roomCd, callback) => {
	const query =
		"SELECT " +
		"pId, " +
		"orderNo, " +
		"fname, " +
		"lname, " +
		"address, " +
		"dob, " +
		"gender, " +
		"phoneNo, " +
		"ssn, " +
		"valid, " +
		"sId, " +
		"sensorInfo.Weight weight, " +
		"sensorInfo.SPO2 spo2," +
		"sensorInfo.Temperature temper," +
		"sensorInfo.Height height," +
		"sensorInfo.Heart_Pulse hPulse, " +
		"sensorInfo.Blood_Pressure hPressure " +
		"FROM " +
		"( " +
		"SELECT " +
		"STT orderNo, " +
		"qExam.Patient_ID pId, " +
		"First_Name fname, " +
		"Last_Name lname, " +
		"Address address, " +
		"Date_Of_Birth dob, " +
		"Gender gender, " +
		"Phone_Number phoneNo, " +
		"SSN ssn, " +
		"flag_valid valid, " +
		"Sensor_ID sId " +
		"FROM " +
		"QUEUE_EXAMINATION qExam, " +
		"PATIENT patient " +
		"WHERE " +
		"patient.Patient_ID = qExam.Patient_ID " +
		"AND qExam.Building_Code = " +
		mysql.escape(buildingCd) +
		" " +
		"AND qExam.Exam_Room_Code = " +
		mysql.escape(roomCd) +
		" " +
		") peq " +
		"INNER JOIN SENSOR_INFORMATION sensorInfo ON peq.sId = sensorInfo.ID " +
		"ORDER BY " +
		"orderNo FOR JSON AUTO ";
	queryForObject(query, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = queryPatientQueue;
