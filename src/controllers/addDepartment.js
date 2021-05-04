const queryAddDepartment = require("../models/queryAddDepartment");

const addDepartment = (data, callback) => {
	queryAddDepartment(data, (res) => {
		if (res < 0) {
			return console.log("ERROR ADD DEPARTMENT");
		}
		callback(1);
	});
};

module.exports = addDepartment;
