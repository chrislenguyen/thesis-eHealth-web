const queryForObject = require("./queryForObject");

const queryForDoctor = (doctorUsername, callback) => {
	const query =
		"SELECT (DOCTOR.First_Name + ' ' + DOCTOR.Last_Name) AS NAME, EXAM_ROOM.Building_Code, EXAM_ROOM.Exam_Room_Code, HOSPITAL.Hospital_Name FROM DOCTOR    INNER JOIN EXAM_ROOM    ON DOCTOR.Dep_ID = EXAM_ROOM.Dep_ID AND DOCTOR.Hospital_ID = EXAM_ROOM.Hospital_ID    INNER JOIN HOSPITAL   ON EXAM_ROOM.Hospital_ID = HOSPITAL.Hospital_ID WHERE DOCTOR.USER_NAME = " +
		doctorUsername;
    queryForObject(query, (err, data) => {
        if (err) {
            callback (err, undefined)
        } else {
            callback (undefined, data)
        }
    })
};

module.exports = queryForDoctor