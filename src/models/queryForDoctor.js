const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryForDoctor = (doctorUsername, callback) => {
	const query =
		"SELECT DOCTOR.First_Name as fname, DOCTOR.Last_Name as lname, EXAM_ROOM.Building_Code as buildingCd, EXAM_ROOM.Exam_Room_Code as examRoomCd, HOSPITAL.Hospital_Name as hosName FROM DOCTOR INNER JOIN EXAM_ROOM ON DOCTOR.Dep_ID = EXAM_ROOM.Dep_ID AND DOCTOR.Hospital_ID = EXAM_ROOM.Hospital_ID    INNER JOIN HOSPITAL   ON EXAM_ROOM.Hospital_ID = HOSPITAL.Hospital_ID WHERE DOCTOR.USER_NAME = " +
		mysql.escape(doctorUsername) +
		" FOR JSON AUTO";
        // console.log(query);
	queryForObject(query, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			// console.log(data);
			callback(undefined, data);
		}
	});
};

module.exports = queryForDoctor;
