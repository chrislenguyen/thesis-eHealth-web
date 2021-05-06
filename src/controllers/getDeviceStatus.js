const queryGetDeviceStatus = require("../models/queryGetDeviceStatus");

const getDeviceStatus = (callback) => {
	queryGetDeviceStatus((err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getDeviceStatus;
