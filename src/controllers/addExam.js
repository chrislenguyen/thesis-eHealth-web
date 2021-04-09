const queryAddMed = require("../models/queryAddMed");
const queryAddExam = require("../models/queryAddExam");
const queryAddNewPatient = require("../models/queryAddNewPatient");
const triggerEvHubPatient = require("../models/triggerEvHubPatient");
const deleteQueue = require("./deleteQueue");

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
				// TODO
				// Handle better add medication
				var resp;
				data.med.forEach((e) => {
					var medData = {
						medName: e.medName,
						pId: data.pId,
						exId: res,
						quantity: e.quantity,
						des: e.des,
					};
					queryAddMed(medData, (res) => {
						if (res < 0) {
							resp = 0;
						} else {
							resp = 1;
						}
						// console.log(resp);
					});
				});
				// console.log(resp);
				callback(1);
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
				return callback("ERROR");
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

module.exports = addExam;
