const mysql = require("mysql");
const queryForObject = require("./queryForObject");

const queryAddDevice = ({ deviceCd, hosId, buildingCd }) => {
	const query =
		" DECLARE @return_status INT; " +
		" EXEC hospital.Add_Device  " +
		"     @Device_Code = " +
		mysql.escape(deviceCd) +
		"     ,@Hospital_ID = " +
		mysql.escape(hosId) +
		"     ,@Building_Code = " +
		mysql.escape(buildingCd) +
		"     ,@para_out = @return_status OUTPUT; ";
	console.log(query);
	queryForObject(query, (err, data) => {
		if (err || data == -1) {
			return console.log("ERROR ADD DEVICE TO DATABASE");
		}
		callback(data);
	});
};

module.exports = queryAddDevice;
