const queryGetRoom = require("../models/queryGetRoom");

const getRoom = (searchData, callback) => {
	queryGetRoom(searchData, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getRoom;
