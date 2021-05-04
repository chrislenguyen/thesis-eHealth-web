const queryGetDepartment = require("../models/queryGetDepartment");

const getDepartment = (searchData, callback) => {
	queryGetDepartment(searchData, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = getDepartment;
