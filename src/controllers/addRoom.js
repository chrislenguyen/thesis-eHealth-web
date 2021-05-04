const queryAddRoom = require("../models/queryAddRoom");

const addRoom = (data, callback) => {
	queryAddRoom(data, (res) => {
		if (res < 0) {
			return console.log("ERROR ADD ROOM");
		}
		callback(1);
	});
};

module.exports = addRoom;
