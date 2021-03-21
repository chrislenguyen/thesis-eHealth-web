// $('#btnOpenAddMedModal').on('click', function () {
//     console.log('Add Med Click');

// });

var doctorInfo;
var doctorLocation;
var doctorBuilding;

$("#buildingRoomSelectModal").modal({
	backdrop: "static",
	keyboard: false,
});

function showDate() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + "/" + dd + "/" + yyyy;

	// console.log(today);

	$("#currentDate").val(today);
}

$("#btnCancelMedModal").on("click", function () {
	$("#myModal").modal("hide");
});

$("#medModal").on("hidden.bs.modal", function () {
	$(":input", this).val("");
	console.log("HIDED");
});

$("#examFormSubmitBtn").on("click", function () {});

function appendToTable(tableId, data) {
	$("#" + tableId + " tbody").append("<tr><th>" + data + "</th></tr>");
	// console.log("<tr><th>" + data + "</th></tr>");
}

$("#selBuildingCd").on("change", function () {
	if (this.value !== "") {
		doctorBuilding.forEach((building) => {
			if (building.bCode == this.value) {
				$("#selRoomCd").find("option").remove().end();
				$("#selRoomCd").append(new Option("", ""));
				building.exRoom.forEach((room) => {
					$("#selRoomCd").append(
						new Option(room.exRoomCode, room.exRoomCode)
					);
				});
			}
		});
	} else {
		$("#selRoomCd").find("option").remove().end();
		$("#selRoomCd").append(new Option("", ""));
	}
});

$("#btnSelRoomModal").on("click", function () {
	if ($("#selBuildingCd").val() !== "" && $("#selRoomCd").val() !== "") {
		$("#buildingCd").val($("#selBuildingCd").val());
		$("#roomCd").val($("#selRoomCd").val());
		$("#buildingRoomSelectModal").modal("hide");
	}
});

function initPage() {
	$.ajax({
		type: "get",
		url: "/init-doctor-info",
		async: false,
		success: function (res) {
			doctorInfo = res;
			doctorLocation = doctorInfo.hospital[0];
			doctorBuilding = doctorInfo.hospital[0].building;
			// console.log(doctorLocation);
		},
	});
	// console.log(doctorLocation);
	$("#selBuildingCd").append(new Option(""));
	showDate();
	loadDoctorInfo();
}

function loadDoctorInfo() {
	if (doctorInfo !== undefined) {
		var doctorName =
			doctorInfo.fname + " " + convertLastName(doctorInfo.lname);
		$("#doctorName").val(doctorName);
		$("#hosName").val(doctorLocation.hosName);
		doctorBuilding.forEach((building) => {
			// console.log(building);
			$("#selBuildingCd").append(
				new Option(building.bCode, building.bCode)
			);
		});
	} else {
		// TODO
		// Handle error
	}
}

function loadQueue(data) {
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
	$("#lNameModal").val(lname);
	$("#fNameModal").val(fname);
}

function loadSensorInfo({
	weight,
	temper,
	spo2,
	height,
	hPulse,
	hPressure,
} = {}) {
	// console.log(sensorInfo);
	$("#weight").val(weight);
	$("#temper").val(temper);
	$("#spo2").val(spo2);
	$("#height").val(height);
	$("#hPulse").val(hPulse);
	$("#hPressure").val(hPressure);
}

function loadExamForm(data) {
	if (data.valid == 0) {
		$("#hdnNewPatientFlag").val(1);
		$("#addPatientModal").modal({
			backdrop: "static",
			keyboard: false,
		});
	} else {
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
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + "/" + dd + "/" + yyyy;

	// console.log(today);

	$("#currentDate").val(today);
}

// myString = "Hello World";
// temp = [...myString];
// array = [];
// temp.forEach((e) => {
// 	if (e == e.toUpperCase()) {
// 		console.log(e);
// 	}
// });
