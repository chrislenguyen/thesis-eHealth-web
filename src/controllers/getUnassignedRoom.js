const queryGetUnassignedRoom = require("../models/queryGetUnassignedRoom");

const getUnassignedRoom = (hosInfo, callback) => {
	queryGetUnassignedRoom(hosInfo, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getUnassignedRoom;
