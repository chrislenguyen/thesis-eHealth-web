const queryDeleteQueue = require("../models/queryDeleteQueue");

const deleteQueue = (data, callback) => {
	queryDeleteQueue(data, (res) => {
		if (res < 0) {
			return console.log("ERROR DEL QUEUE");
		}
		callback(1);
	});
};

module.exports = deleteQueue;
