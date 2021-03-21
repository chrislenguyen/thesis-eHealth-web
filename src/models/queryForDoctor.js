const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryForDoctor = (doctorUsername, callback) => {
	const query =
		"SELECT DISTINCT doctor.Doctor_ID docId, doctor.First_Name fname, doctor.Last_Name lname, hospital.Hospital_ID hosId, hospital.Hospital_Name hosName, building.Building_Code bCode, exRoom.Exam_Room_Code exRoomCode FROM DOCTOR doctor LEFT JOIN HOSPITAL hospital ON  DOCTOR.Hospital_ID = hospital.Hospital_ID LEFT JOIN BUILDING building on hospital.Hospital_ID = building.Hospital_ID LEFT JOIN EXAM_ROOM exRoom ON hospital.Hospital_ID = exRoom.Hospital_ID AND building.Building_Code = exRoom.Building_Code WHERE doctor.USER_NAME =" +
		mysql.escape(doctorUsername) +
		"AND doctor.Dep_ID = exRoom.Dep_ID FOR JSON AUTO";
	queryForObject(query, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			// console.log(data);
			callback(undefined, data[0]);
		}
	});
};

module.exports = queryForDoctor;
