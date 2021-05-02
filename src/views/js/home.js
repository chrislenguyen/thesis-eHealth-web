var doctorInfo;
var doctorHospitalName;
var doctorBuilding;
var doctorRoom;
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

// Set scrolling for queue and form

$("#leftCol").css(
	"min-height",
	$("#outLeftCol").innerHeight() -
		($("#infoBar").innerHeight() + $("#roomBar").innerHeight()) -
		10
);

$("#leftCol").css(
	"max-height",
	$("#outLeftCol").innerHeight() -
		($("#infoBar").innerHeight() + $("#roomBar").innerHeight()) -
		10
);

$("#rightExamForm").css(
	"min-height",
	$("#outRightCol").innerHeight() -
		($("#rightTopBar").innerHeight() + $("#rightInfoBar").innerHeight()) -
		10
);

$("#rightExamForm").css(
	"max-height",
	$("#outRightCol").innerHeight() -
		($("#rightTopBar").innerHeight() + $("#rightInfoBar").innerHeight()) -
		10
);

// On screen events

$("#btnConfirmPresModal").click(function (e) {
	e.preventDefault();
	var decision = confirm("ARE YOU SURE?");
	if (decision) {
		$("#presConfirmModal").modal("hide");
		if ($("#hdnNewPatientFlag").val() == 1) {
			$("#addPatientModal").modal({
				backdrop: "static",
				keyboard: false,
			});
		}
	}
});

$("#btnReloadQueue").click(function (e) {
	e.preventDefault();
	getPatientInfo(data, (patientInfo) => {
		if (patientInfo.noDataFlag) {
			$("#rightExamForm *").prop("disabled", true);
			$("#btnReloadQueue").show();
		} else {
			$("#rightExamForm *").prop("disabled", false);
			loadQueue(patientInfo);
			loadExamForm(patientInfo[0]);
		}
	});
});

$("#btnNoPresModal").click(function (e) {
	e.preventDefault();
	var decision = confirm("ARE YOU SURE?");
	if (decision) {
		$("#presConfirmModal").modal("hide");
		data = {
			absent: 1,
			newPatientFlag: $("#hdnNewPatientFlag").val(),
			roomCd: $("#roomCd").val().trim(),
			buildingCd: $("#buildingCd").val().trim(),
		};
		$.ajax({
			type: "post",
			url: "/delete-absent-patient",
			data,
			dataType: "json",
			success: function (res) {
				if (res.delPatientRes == 1 || res.delQueueRes == 1) {
					getPatientInfo(data, (patientInfo) => {
						if (patientInfo.noDataFlag) {
							$("#rightExamForm *").prop("disabled", true);
							$("#btnReloadQueue").show();
						} else {
							$("#rightExamForm *").prop("disabled", false);
							loadQueue(patientInfo);
							loadExamForm(patientInfo[0]);
						}
					});
					clearInput();
					clearQueue();
				}
			},
		});
	}
});

$("#btnCancelMedModal").on("click", function () {
	$("#medModal").modal("hide");
});

$("#medModal").on("hidden.bs.modal", function () {
	$(":input", this).val("");
});

$("#btnModPatientInfo").click(function (e) {
	e.preventDefault();
	// TODO
	// Handle modify patient info
	$("#addPatientModal").modal({
		backdrop: "static",
		keyboard: false,
	});
});

$("#btnAddPatient").on("click", function () {
	if (
		$("#addPatientModal :input:empty").filter(function () {
			return $.trim($(this).val()).length == 0;
		}).length == 0
	) {
		var lname = $("#lNameModal").val().trim();
		var fname = $("#fNameModal").val().trim();
		var dob = $("#dobModal").val();
		var gender = $("#genderModal").val();
		var ssn = $("#ssnModal").val().trim();
		var phoneNo = $("#phoneNoModal").val().trim();
		var address = $("#addressModal").val().trim();
		var patientInfo = {
			lname,
			fname,
			dob,
			gender,
			ssn,
			phoneNo,
			address,
		};
		loadPatientInfo(patientInfo);
		$("#addPatientModal").modal("hide");
		for (let i = 0; i < $(".modal").find("input").length; ++i) {
			console.log();
		}
	} else {
		// TODO
		// Handle not enough input
	}
});

$("#btnCancelPatientModal").on("click", function () {
	if (
		$("#addPatientModal :input:empty").filter(function () {
			return $.trim($(this).val()).length == 0;
		}).length == 0
	) {
		$("#addPatientModal").modal("hide");
	} else {
		// TODO
		// Handle not enough input
	}
});

$("#btnSubmitExamForm").on("click", function () {
	window.scrollTo({ top: 0, behavior: "smooth" });
	var med = [];
	table = $("#medList tbody");
	for (let i = 0; table.find("tr").length > 0; i++) {
		med[i] = {
			medName: table.find("tr").find("td").eq(0).text(),
			quantity: table.find("tr").find("td").eq(1).text(),
			des: table.find("tr").find("td").eq(2).text(),
		};
		table.find("tr")[0].remove();
	}
	// console.log(med);
	data = {
		orderNo: $("#patientQ tbody tr th").eq(0).text(),
		newPatientFlag: $("#hdnNewPatientFlag").val(),
		lname: $("#lNameModal").val().trim(),
		fname: $("#fNameModal").val().trim(),
		dob: $("#dob").val(),
		gender: $("#genderModal").val(),
		ssn: $("#ssn").val().trim(),
		phoneNo: $("#phoneNo").val().trim(),
		address: $("#address").val().trim(),
		diagnose: $("#diagnose").val().trim(),
		examDate: yyyy + "-" + mm + "-" + dd,
		nextExamDate: $("#nextExamDate").val().trim(),
		roomCd: $("#roomCd").val().trim(),
		buildingCd: $("#buildingCd").val().trim(),
		med,
	};
	// console.log(data);
	var decision = confirm("ARE YOU SURE?");
	if (decision) {
		$.ajax({
			type: "post",
			url: "/add-exam-info",
			data,
			dataType: "json",
			success: function (res) {
				console.log(res);
				if (res.procRes == 1) {
					getPatientInfo(data, (patientInfo) => {
						if (patientInfo.noDataFlag) {
							$("#btnReloadQueue").show();
							$("#rightExamForm *").prop("disabled", true);
						} else {
							$("#rightExamForm *").prop("disabled", false);
							loadQueue(patientInfo);
							loadExamForm(patientInfo[0]);
						}
					});
					clearInput();
					clearQueue();
				} else {
					// TODO
					// Handle submit exam form fail
				}
			},
		});
	}
});

// $("#selBuildingCd").on("change", function () {
// 	if (this.value !== "") {
// 		doctorBuilding.forEach((building) => {
// 			if (building.bCode == this.value) {
// 				$("#selRoomCd").find("option").remove().end();
// 				$("#selRoomCd").append(new Option("", ""));
// 				building.exRoom.forEach((room) => {
// 					$("#selRoomCd").append(
// 						new Option(room.exRoomCode, room.exRoomCode)
// 					);
// 				});
// 			}
// 		});
// 	} else {
// 		$("#selRoomCd").find("option").remove().end();
// 		$("#selRoomCd").append(new Option("", ""));
// 	}
// });

// $("#btnSelRoomModal").on("click", function () {
// 	if ($("#selBuildingCd").val() !== "" && $("#selRoomCd").val() !== "") {
// 		changeRoom($("#selBuildingCd").val(), $("#selRoomCd").val());
// 	}
// });

$("#btnAddMed").click(function (e) {
	e.preventDefault();
	if (
		$("#medModal :input:empty").filter(function () {
			return $.trim($(this).val()).length == 0;
		}).length == 0
	) {
		medInfo = {
			name: $("#medNameModal").val().trim(),
			quantity: $("#medQuantityModal").val(),
			des: $("#medDescModal").val().trim(),
		};
		appendToMedTable(medInfo);
		$(":input", this).val("");
		$("#medModal").modal("hide");
	} else {
		//TODO
		// Handle no enough input
	}
});

// Functions

function clearInput() {
	$(".remove-target").val("");
	$(".modal").find("input").val("").end();
}

function clearQueue() {
	$("#patientQ tbody").empty();
}

function removeMed() {
	$(".medDelBtn").click(function (e) {
		e.preventDefault();
		$("tr.selected").removeClass("selected");
		$(this).closest("tr").addClass("selected");
		$("tr.selected").remove();
	});
}

function appendToQueueTable(orderNo, name) {
	$("#patientQ tbody").append(
		"<tr>" +
			'<th scope="row">' +
			orderNo +
			"</th>" +
			'<td colspan="2">' +
			name +
			"</td>" +
			"</tr>"
	);
}

function appendToMedTable({ name, quantity, des } = {}) {
	$("#medList tbody").append(
		"<tr>" +
			"<td>" +
			name +
			"</td>" +
			"<td>" +
			quantity +
			"</td>" +
			"<td>" +
			des +
			"</td>" +
			"<td>" +
			'<button type="button" class="btn btn-danger medDelBtn" id="medDelBtn">' +
			'<i class="bi bi-trash-fill"></i>' +
			"</button>" +
			"</td>" +
			"</tr>"
	);
	removeMed(); //Binding function
}

const getPatientInfo = (data, callback) => {
	$.ajax({
		type: "post",
		url: "/get-patient-info",
		data,
		dataType: "json",
		success: function (response) {
			callback(response);
		},
	});
};

// function changeRoom(buildingCd, roomCd) {
// 	clearQueue();
// 	clearInput();
// 	$("#buildingCd").val(buildingCd);
// 	$("#roomCd").val(roomCd);
// 	$("#buildingRoomSelectModal").modal("hide");
// 	data = { buildingCd, roomCd };
// 	getPatientInfo(data, (response) => {
// 		if (response.noDataFlag) {
// 			$("#rightExamForm *").prop("disabled", true);
// 			$("#btnReloadQueue").show();
// 		} else {
// 			$("#rightExamForm *").prop("disabled", false);
// 			loadQueue(response);
// 			loadExamForm(response[0]);
// 		}
// 	});
// }

function confirmPatientPresence() {
	$("#presConfirmModal").modal({
		backdrop: "static",
		keyboard: false,
	});
}

function initPage() {
	// $("#buildingRoomSelectModal").modal({
	// 	backdrop: "static",
	// 	keyboard: false,
	// });
	$.ajax({
		type: "get",
		url: "/init-doctor-info",
		// async: false,
		success: function (res) {
			doctorInfo = res;
			doctorHospitalName = doctorInfo.hosName;
			doctorBuilding = doctorInfo.bCode;
			doctorRoom = doctorInfo.exRoomCode;
			data = { buildingCd: doctorBuilding, roomCd: doctorRoom };
			$("#selBuildingCd").append(new Option(""));
			loadDoctorInfo();
			getPatientInfo(data, (response) => {
				if (response.noDataFlag) {
					$("#rightExamForm *").prop("disabled", true);
					$("#btnReloadQueue").show();
				} else {
					$("#rightExamForm *").prop("disabled", false);
					loadQueue(response);
					loadExamForm(response[0]);
				}
			});
		},
	});
	showDate();
}

function loadDoctorInfo() {
	if (doctorInfo !== undefined) {
		var doctorName =
			doctorInfo.fname + " " + convertLastName(doctorInfo.lname);
		$("#doctorName").val(doctorName);
		$("#hosName").val(doctorHospitalName);
		$("#buildingCd").val(doctorBuilding);
		$("#roomCd").val(doctorRoom);
	} else {
		// TODO
		// Handle error
	}
}

function loadQueue(data) {
	$("#btnReloadQueue").hide();
	data.forEach((e) => {
		e.valid != 0
			? appendToQueueTable(e.orderNo, e.lname + " " + e.fname)
			: appendToQueueTable(e.orderNo, "NEW PATIENT");
	});
	// console.log(data);
}

function loadPatientInfo({
	lname,
	fname,
	dob,
	gender,
	ssn,
	phoneNo,
	address,
} = {}) {
	$("#pName").val(lname + " " + fname);
	$("#dob").val(dob);
	gender == "m" ? $("#gender").val("Male") : $("#gender").val("Female");
	$("#ssn").val(ssn);
	$("#phoneNo").val(phoneNo);
	$("#address").val(address);
	// $("#lNameModal").val(lname);
	// $("#fNameModal").val(fname);
}

function loadSensorInfo({ weight, temper, spo2, height, hPulse, bmi } = {}) {
	// console.log(sensorInfo);
	$("#weight").val(weight);
	$("#temper").val(temper);
	$("#spo2").val(spo2);
	$("#height").val(height);
	$("#hPulse").val(hPulse);
	$("#bmi").val(bmi);
}

function loadExamForm(data) {
	if (data.valid == 0) {
		$("#hdnNewPatientFlag").val(1);
		confirmPatientPresence();
	} else {
		confirmPatientPresence();
		$("#hdnNewPatientFlag").val(0);
		loadPatientInfo(data);
	}
	loadSensorInfo(data.sensorInfo[0]);
}

function convertLastName(lname) {
	var allCapLName = "";
	lname = [...lname];
	// console.log(lname);
	lname.forEach((e) => {
		// console.log(e);
		if (e == e.toUpperCase() && e != " ") {
			allCapLName += e;
		}
	});
	// console.log(allCapLName);
	return allCapLName;
}

function showDate() {
	$("#currentDate").val(mm + "/" + dd + "/" + yyyy);
}
