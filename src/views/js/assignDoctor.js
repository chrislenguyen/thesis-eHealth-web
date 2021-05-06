var doctorId;
var doctorLocationInfo = {};
var buildingRoomInfo;

$("#assignDoctorModal").on("hidden.bs.modal", function () {
	$("#assignDoctorModal select").empty();
});

$("#assignDoctorModal").on("shown.bs.modal", function () {
	$("#bCdAssignDoctorFormModal").find("option").remove().end();
	$("#bCdAssignDoctorFormModal").append(new Option("", ""));
	$.ajax({
		type: "post",
		url: "/get-unassigned-room",
		data: doctorLocationInfo,
		dataType: "json",
		success: function (response) {
			// console.log(response);
			buildingRoomInfo = response;
			response.forEach((building) => {
				$("#bCdAssignDoctorFormModal").append(
					new Option(building.bCd, building.bCd)
				);
			});
		},
	});
});

$("#bCdAssignDoctorFormModal").on("change", function () {
	$("#roomCdAssignDoctorFormModal").find("option").remove().end();
	$("#roomCdAssignDoctorFormModal").append(new Option("", ""));
	if (this.value !== "") {
		buildingRoomInfo
			.find((building) => building.bCd == this.value)
			.exRoom.forEach((room) => {
				$("#roomCdAssignDoctorFormModal").append(
					new Option(room.roomCd, room.roomCd)
				);
			});
	}
});

$("#btnConfirmAssignDoctorModal").click(function (e) {
	e.preventDefault();
	if (
		$("#bCdAssignDoctorFormModal").val() !== "" &&
		$("#roomCdAssignDoctorFormModal").val() !== ""
	) {
		data = {
			doctorId,
			hosId: doctorLocationInfo.hosId,
			roomCd: $("#roomCdAssignDoctorFormModal").val(),
			bCd: $("#bCdAssignDoctorFormModal").val(),
		};
		console.log(data);
		$.ajax({
			type: "post",
			url: "/assign-doctor-room",
			data,
			dataType: "json",
			success: function (response) {
				if (response.status == 1) {
					$("#addSuccessDialog").show();
					clearAssignDoctorTable();
					$("#assignDoctorModal").modal("hide");
					return loadAssignDoctorTable();
				}
			},
		});
	}
});

$("#depAssignDoctorForm").on("change", function () {
	if (this.value !== "") {
		$("#assignDoctorTable tbody").empty();
		$("#assignDoctorForm select").each(function () {
			var input = $(this);
			var index = input.attr("data-key");
			doctorLocationInfo[index] = input.val();
		});
		loadAssignDoctorTable();
	}
});

function appendAssignDoctorTable(data) {
	$("#assignDoctorTable tbody").loadTemplate(
		"#tmplAssignDoctorTableRow",
		data,
		{
			append: true,
		}
	);
	getSelectedDoctor();
}

function clearAssignDoctorTable() {
	$("#assignDoctorTable tbody").empty();
}

function getSelectedDoctor() {
	$(".btnAssignDoctor")
		.off()
		.click(function () {
			doctorId = $(this).closest("td").prev("td").text().trim();
		});
}

function loadAssignDoctorTable() {
	$.ajax({
		type: "POST",
		url: "/get-doctor-room-info",
		data: doctorLocationInfo,
		dataType: "json",
		success: function (response) {
			response.forEach((doctor) => {
				if (doctor.roomCd === undefined && doctor.bCd === undefined) {
					doctor.roomCd = doctor.bCd = "Chưa Phân Phòng Khám";
				} else {
					doctorLocationInfo.roomCd = doctor.roomCd;
					doctorLocationInfo.bCd = doctor.bCd;
				}
				doctor.docName = doctor.lname + " " + doctor.fname;
				appendAssignDoctorTable(doctor);
			});
		},
	});
}
