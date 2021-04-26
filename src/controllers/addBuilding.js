const queryAddBuilding = require("../models/queryAddBuilding");

const addBuilding = (data, callback) => {
	queryAddBuilding(data, (res) => {
		if (res < 0) {
			return console.log("ERROR ADD BUILDING");
		}
		callback(1);
	});
};

module.exports = addBuilding;
