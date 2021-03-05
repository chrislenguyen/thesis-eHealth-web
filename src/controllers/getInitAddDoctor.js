const queryInitAddDoctor = require("../models/queryInitAddDoctor");

const getInitAddDoctor = (callback) => {
	queryInitAddDoctor((err, data) => {
		// console.log(data);
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getInitAddDoctor;
