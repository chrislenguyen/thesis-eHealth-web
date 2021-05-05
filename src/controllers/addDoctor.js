const queryAddDoctor = require("../models/queryAddDoctor");

const addDoctor = (data, callback) => {
	queryAddDoctor(data, (data) => {
		if (data < 0) {
			return console.log("ERROR ADD DOCTOR");
		}
		callback(1);
	});
};

module.exports = addDoctor;
