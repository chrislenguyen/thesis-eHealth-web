const queryForObject = require("./queryForObject");

const queryInitAddDoctor = (callback) => {
	const query =
		"SELECT HOSPITAL.Hospital_ID as hosId, HOSPITAL.Hospital_Name as hosName, DEPARTMENT.Dep_ID as depId, DEPARTMENT.Dep_Name as depName FROM HOSPITAL INNER JOIN DEPARTMENT as department ON HOSPITAL.Hospital_ID = DEPARTMENT.Hospital_ID FOR JSON AUTO;";

	queryForObject(query, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = queryInitAddDoctor;
