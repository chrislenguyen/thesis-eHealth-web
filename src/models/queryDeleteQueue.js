const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryDeleteQueue = (
	{ hosId, buildingCd, roomCd, orderNo } = {},
	callback
) => {
	var query =
		"DECLARE @return_status INT " +
		"EXEC hospital.Delete_Queue_Exam " +
		"@STT = " +
		orderNo +
		" , " +
		"@H_ID = " +
		hosId +
		" , " +
		"@Building_Code = " +
		buildingCd +
		" , " +
		"@Exam_Room_Code = " +
		roomCd +
		" , " +
		"@para_out = @return_status OUTPUT;";

	// console.log(query);
	queryForObject(query, (err, data) => {
		callback(data);
	});
};

module.exports = queryDeleteQueue;
