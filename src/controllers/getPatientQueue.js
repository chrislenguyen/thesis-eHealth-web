const queryPatientQueue = require("../models/queryPatientQueue");

const getPatientQueue = (buildingCd, roomCd, callback) => {
	queryPatientQueue(buildingCd, roomCd, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getPatientQueue;
