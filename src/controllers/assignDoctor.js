const queryAssignDoctor = require("../models/queryAssignDoctor");
const triggerEvHubUpdateExRoom = require("../models/triggerEvHubUpdateExRoom");

const assignDoctor = (assignDocInfo, callback) => {
	queryAssignDoctor(assignDocInfo, (data) => {
		if (data < 0) {
			return console.log("ERROR ASSIGN DOCTOR");
		}
		triggerEvHubUpdateExRoom(assignDocInfo.hosId);
		callback(1);
	});
};

module.exports = assignDoctor;
