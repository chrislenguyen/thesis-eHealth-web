const queryAddMed = require("../models/queryAddMed");
const queryAddExam = require("../models/queryAddExam");
const queryAddNewPatient = require("../models/queryAddNewPatient");

function addExamMed(data, callback) {
	queryAddExam(data, (res) => {
		if (res < 0) {
			callback(0);
			// callback(err, undefined);
		} else {
			// console.log(res);
			if (data.med === undefined) {
				callback(1);
			} else {
				data.med.forEach((e) => {
					var medData = {
						medName: e.medName,
						pId: data.pId,
						exId: res,
						quantity: e.quantity,
					};
					queryAddMed(medData, (res) => {
						if (res < 0) {
							callback(0);
						} else {
							callback(1);
						}
					});
				});
			}
		}
	});
}

const addExam = (data, callback) => {
	console.log(data);
	if (data.newPatientFlag === "1") {
		queryAddNewPatient(data, (res) => {
			if (res < 0) {
				return callback("ERROR");
			}
			addExamMed(data, (res) => {
				callback(res);
			});
		});
	} else {
		addExamMed(data, (res) => {
			callback(res);
		});
	}
};

module.exports = addExam;
