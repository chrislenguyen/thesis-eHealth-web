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
		changeRoom($("#selBuildingCd").val(), $("#selRoomCd").val());
	}
});

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
			"<td>" +
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

function changeRoom(buildingCd, roomCd) {
	$("#patientQ tbody").empty();
	$("#buildingCd").val(buildingCd);
	$("#roomCd").val(roomCd);
	$("#buildingRoomSelectModal").modal("hide");
	// console.log(buildingCd);
	// console.log(roomCd);
	data = { buildingCd, roomCd };
	$.ajax({
		type: "post",
		url: "/get-patient-info",
		data: data,
		dataType: "json",
		success: function (response) {
			loadQueue(response);
			loadExamForm(response[0]);
			// $("#medList tbody").remove();
		},
	});
}

function initPage() {
	$("#buildingRoomSelectModal").modal({
		backdrop: "static",
		keyboard: false,
	});
	$.ajax({
		type: "get",
		url: "/init-doctor-info",
		// async: false,
		success: function (res) {
			doctorInfo = res;
			doctorLocation = doctorInfo.hospital[0];
			doctorBuilding = doctorInfo.hospital[0].building;
			$("#selBuildingCd").append(new Option(""));
			loadDoctorInfo();
			// console.log(doctorLocation);
		},
	});
	showDate();
	// console.log(doctorLocation);
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
