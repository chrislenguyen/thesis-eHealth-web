const queryDelAbsPatient = require("../models/queryDelAbsPatient");

const deleteAbsPatient = (data, callback) => {
	queryDelAbsPatient(data, (res) => {
		if (res < 0) {
			return console.log("ERROR DELETE TEMP PATIENT");
		}
		callback(1);
	});
};

module.exports = deleteAbsPatient;
