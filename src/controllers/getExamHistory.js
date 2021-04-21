const queryGetExamHistory = require("../models/queryGetExamHistory");

const getExamHistory = (patientInfo, callback) => {
	queryGetExamHistory(patientInfo, (err, data) => {
		if (err) {
			return console.log("ERROR GET EXAM HISTORY");
		}
		callback(data);
	});
};

module.exports = getExamHistory;
