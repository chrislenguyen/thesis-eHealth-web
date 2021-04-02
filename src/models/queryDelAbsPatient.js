const queryForObject = require("./queryForObject");
const mysql = require("mysql");

const queryDelAbsPatient = ({ pId, sId }, callback) => {
	query =
		" DECLARE @return_status INT " +
		" EXEC hospital.Delete_Temp_Patient " +
		" @Patient_ID = " +
		mysql.escape(pId) +
		" , " +
		" @Sensor_ID = " +
		mysql.escape(sId) +
		" , " +
		" @para_out = @return_status OUTPUT; ";
	// console.log(query);
	queryForObject(query, (err, data) => {
		callback(data);
	});
};

module.exports = queryDelAbsPatient;
