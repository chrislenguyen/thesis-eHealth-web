const mysql = require("mysql");

const queryAddMed = require("../models/queryAddMed");
const queryAddExam = require("../models/queryAddExam");
const queryAddNewPatient = require("../models/queryAddNewPatient");
const triggerEvHubPatient = require("../models/triggerEvHubPatient");
const deleteQueue = require("./deleteQueue");

function addExamMed(data, callback) {
	queryAddExam(data, (res) => {
		if (res < 0) {
			console.log("ERROR ADD EXAMINATION");
			// callback(err, undefined);
		} else {
			// console.log(res);
			if (data.med === undefined) {
				callback(1);
			} else {
				convertMedData(data, res, (convertedMedData) => {
					console.log(convertedMedData);
					queryAddMed(convertedMedData, (res) => {
						if (res < 0) {
							return console.log("ERROR ADD MED");
						}
						callback(1);
					});
				});
			}
		}
	});
}

const addExam = (data, callback) => {
	// console.log(data);
	//TODO
	// Clean code delete queue + add Med
	if (data.newPatientFlag === "1") {
		queryAddNewPatient(data, (res) => {
			if (res < 0) {
				return callback("ERROR ADD NEW PATIENT");
			}
			addExamMed(data, (res) => {
				if (res > 0) {
					deleteQueue(data, (res) => {
						if (res < 0) {
							return console.log("ERROR DELETE QUEUE");
						}
						triggerEvHubPatient(data.pId);
						callback(1);
					});
				}
			});
		});
	} else {
		addExamMed(data, (res) => {
			if (res > 0) {
				deleteQueue(data, (res) => {
					if (res < 0) {
						return console.log("ERROR DELETE QUEUE");
					}
					callback(1);
				});
			}
		});
	}
};

function convertMedData(data, newExamId, callback) {
	var convertArray = "";
	data.med.forEach((m, idx, array) => {
		convertArray += "(";
		convertArray += data.pId + ",";
		convertArray += newExamId + ",";
		convertArray += mysql.escape(m.medName) + ",";
		convertArray += "N" + mysql.escape(m.des) + ",";
		convertArray += m.quantity;
		convertArray += ")";
		if (idx !== array.length - 1) {
			convertArray += ",";
		}
	});
	callback(convertArray);
}

module.exports = addExam;
