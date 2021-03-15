const queryForDoctor = require("../models/queryForDoctor");

const getInitDoctorInfo = (doctorUsername, callback) => {
	queryForDoctor(doctorUsername, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getInitDoctorInfo;
