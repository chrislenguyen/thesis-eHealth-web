const queryGetDoctorRoom = require("../models/queryGetDoctorRoom");

const getDoctorRoom = (hosDepInfo, callback) => {
	queryGetDoctorRoom(hosDepInfo, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getDoctorRoom;
