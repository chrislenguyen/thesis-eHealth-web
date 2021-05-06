const queryAssignDoctor = require("../models/queryAssignDoctor");

const assignDoctor = (assignDocInfo, callback) => {
	queryAssignDoctor(assignDocInfo, (data) => {
		if (data < 0) {
			return console.log("ERROR ASSIGN DOCTOR");
		}
		callback(1);
	});
};

module.exports = assignDoctor;
