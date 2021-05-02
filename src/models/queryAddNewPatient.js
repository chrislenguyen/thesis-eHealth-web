const queryForObject = require("./queryForObject");
const mysql = require("mysql");
const md5 = require("md5");

const queryAddNewPatient = (
	{ pId, fname, lname, dob, gender, address, phoneNo, ssn } = {},
	callback
) => {
	const query =
		"DECLARE @return_status INT " +
		"EXEC hospital.Update_Patient_Infor " +
		"@Patient_ID = " +
		mysql.escape(pId) +
		" ," +
		"@First_Name =" +
		mysql.escape(fname) +
		"," +
		"@Last_Name =" +
		mysql.escape(lname) +
		"," +
		"@Date_Of_Birth =" +
		mysql.escape(dob) +
		"," +
		"@Gender =" +
		mysql.escape(gender) +
		"," +
		"@Address =" +
		mysql.escape(address) +
		"," +
		"@Phone_Number =" +
		mysql.escape(phoneNo) +
		"," +
		"@SSN =" +
		mysql.escape(ssn) +
		"," +
		"@User_Name =" +
		mysql.escape(
			(
				fname.toLowerCase() +
				lname.toLowerCase() +
				dob.toString().substr(2, 2)
			).replace(/\s/g, "")
		) +
		"," +
		"@Password = " +
		mysql.escape(md5(lname)) +
		"," +
		"@E_Mail =" +
		mysql.escape(
			(
				fname.toLowerCase() +
				lname.toLowerCase() +
				dob.toString().substr(2, 2)
			).replace(/\s/g, "") + "@gmail.com"
		) +
		"," +
		"@para_out = @return_status OUTPUT";
	// "'51'";
	console.log(query);
	queryForObject(query, (err, data) => {
		if (err) {
			return console.log("ERROR QUERY ADD NEW PATIENT");
		}
		callback(data);
	});
};

module.exports = queryAddNewPatient;
