const queryForObject = require("./queryForObject.js");

const queryInitAddDevice = (callback) => {
	const query =
		"SELECT" +
		"    hos.Hospital_ID as hosId, " +
		"    hos.Hospital_Name as hosName, " +
		"    BUILDING.Building_Code as bCd " +
		"FROM " +
		"    HOSPITAL hos, " +
		"    BUILDING building " +
		"WHERE" +
		"    hos.Hospital_ID = building.Hospital_ID FOR JSON AUTO; ";
    // console.log(query);
	queryForObject(query, (err, data) => {
		// console.log(data);
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = queryInitAddDevice;
