const queryInitAddDevice = require("../models/queryInitAddDevice");

const getInitAddDevice = (callback) => {
	queryInitAddDevice((err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getInitAddDevice;
