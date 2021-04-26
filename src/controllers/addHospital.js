const queryAddHospital = require("../models/queryAddHospital");

const addHospital = (data, callback) => {
	queryAddHospital(data, (res) => {
		if (res < 0) {
			return console.log("ERROR ADD HOSPITAL");
		}
		callback(1);
	});
};

module.exports = addHospital;
