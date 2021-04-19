const queryForObject = require("./queryForObject");

const queryGetNextDeviceCd = (callback) => {
	const query =
		" DECLARE @return_status CHAR(10);" +
		" EXEC hospital.GET_NEXT_DEVICE_CD @para_out = @return_status OUTPUT;" +
		" SELECT" +
		"   @return_status as deviceCd FOR JSON PATH";

	// console.log(query);
	queryForObject(query, (err, data) => {
		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, data);
		}
	});
};

module.exports = queryGetNextDeviceCd;
