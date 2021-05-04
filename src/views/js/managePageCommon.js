const NO_ANIMATION = 0;
var hosBuildingSelectOption;
var hosDepSelectOption;

$(".optTop input").click(function (e) {
	e.preventDefault();
	hideAllOption();
	hideAllExtOption();
	hideAllForm();
});

$(".optionBar input").click(function (e) {
	e.preventDefault();
	hideAllExtOption();
	hideAllForm();
});

$(".extOptionBar input").click(function (e) {
	e.preventDefault();
	hideAllForm();
});

$("#optUser").click(function (e) {
	e.preventDefault();
	$("#optUserExt").show();
});

$("#optHospital").click(function (e) {
	e.preventDefault();
	$("#optHosExt").show();
});

$("#optDevice").click(function (e) {
	e.preventDefault();
	$("#optDeviceExt").show();
});

$("#changePwd").click(function (e) {
	e.preventDefault();
	$("#changePassForm").show();
	$("#userTypeSwitch").show();
});

$("#addDoc").click(function (e) {
	e.preventDefault();
	$("#addDoctorForm").show(NO_ANIMATION, () => {
		loadHospitalDepartmentSelect();
	});
});

$("#modDoc").click(function (e) {
	e.preventDefault();
	$("#modDocForm").show();
});

$("#changeDocSts").click(function (e) {
	e.preventDefault();
});

$("#optHos").click(function (e) {
	e.preventDefault();
	$("#optHExt").show();
});

$("#optDept").click(function (e) {
	e.preventDefault();
	$("#optDeptExt").show();
});

$("#optBuilding").click(function (e) {
	e.preventDefault();
	$("#optBuildingExt").show();
});

$("#optRoom").click(function (e) {
	e.preventDefault();
	$("#optRoomExt").show();
});

$("#optExRoom").click(function (e) {
	e.preventDefault();
	$("#optExRoomExt").show();
});

$("#addHos").click(function (e) {
	e.preventDefault();
	$("#addHosForm").show();
});

$("#addBuilding").click(function (e) {
	e.preventDefault();
	$("#addBuildingForm").show(NO_ANIMATION, () => {
		clearBuildingTable();
		loadHospitalBuildingSelect();
	});
});

$("#addDept").click(function (e) {
	e.preventDefault();
	$("#addDeptForm").show();
});

$("#addRoom").click(function (e) {
	e.preventDefault();
	$("#addRoomForm").show(NO_ANIMATION, () => {
		loadHospitalBuildingSelect();
	});
});

$("#addDevice").click(function (e) {
	e.preventDefault();
	$("#addDeviceForm").show(NO_ANIMATION, () => {
		loadHospitalBuildingSelect();
	});
});

$("#modDevice").click(function (e) {
	e.preventDefault();
	$("#modDeviceForm").show(NO_ANIMATION, () => {
		loadHospitalBuildingSelect();
	});
});

$("#updateDevice").click(function (e) {
	e.preventDefault();
});

$('select[name="hosBuildingList"]').on("change", function () {
	$('select[name="buildingListDevForm"]').find("option").remove().end();
	$('select[name="buildingListDevForm"]').append(new Option("", ""));
	if (this.value !== "") {
		hosBuildingSelectOption
			.find((hos) => hos.hosId == this.value)
			.building.forEach((b) => {
				$('select[name="buildingListDevForm"]').append(
					new Option(b.bCd, b.bCd)
				);
			});
	}
});

$('select[name="hosList"]').on("change", function () {
	$('select[name="depList"]').find("option").remove().end();
	$('select[name="depList"]').append(new Option("", ""));
	if (this.value !== "") {
		hosDepSelectOption
			.find((hos) => hos.hosId == this.value)
			.department.forEach((d) => {
				$('select[name="depList"]').append(
					new Option(d.depName, d.depId)
				);
			});
	}
});

function closeSuccessDialog() {
	$("#addSuccessDialog").hide();
}

function hideAllOption() {
	$(".optionBar").hide();
	$(".optionBar .active").removeClass("active");
}

function hideAllExtOption() {
	$(".extOptionBar").hide();
	$(".extOptionBar .active").removeClass("active");
}

function hideAllForm() {
	$("form").hide();
}

function loadHospitalBuildingSelect() {
	$('select[name="hosBuildingList"]').find("option").remove().end();
	$('select[name="hosBuildingList"]').append(new Option("", ""));
	$.ajax({
		type: "get",
		url: "/init-add-device",
		success: function (response) {
			hosBuildingSelectOption = response;
			hosBuildingSelectOption.forEach((e) => {
				$('select[name="hosBuildingList"]').append(
					new Option(e.hosName, e.hosId)
				);
			});
		},
	});
}

function loadHospitalDepartmentSelect() {
	$('select[name="hosList"]').find("option").remove().end();
	$('select[name="hosList"]').append(new Option("", ""));
	$.ajax({
		type: "get",
		url: "/init-add-doctor",
		success: function (response) {
			hosDepSelectOption = response;
			hosDepSelectOption.forEach((e) => {
				$('select[name="hosList"]').append(
					new Option(e.hosName, e.hosId)
				);
			});
		},
	});
}

// function debug() {
// 	$(".bInput").hide();
// }
