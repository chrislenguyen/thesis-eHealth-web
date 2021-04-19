

$("#optUser").click(function (e) {
	e.preventDefault();
	hideAllOption();
	hideAllForm();
	$("#optUserExt").show();
});

$("#optHospital").click(function (e) {
	e.preventDefault();
	hideAllOption();
	hideAllForm();
	$("#optHosExt").show();
});

$("#optDevice").click(function (e) {
	e.preventDefault();
	hideAllOption();
	hideAllForm();
	$("#optDeviceExt").show();
});

$("#changePwd").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#test").load("test.html");
	$("#changePassForm").show();
	$("#userTypeSwitch").show();
});

$("#addDoc").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDoctorForm").show();
});

$("#modDoc").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#modDocForm").show();
});

$("#changeDocSts").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDoctorForm").show();
});

$("#modHos").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDoctorForm").show();
});

$("#modDept").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDoctorForm").show();
});

$("#modBR").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDoctorForm").show();
});

$("#assignRoom").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDoctorForm").show();
});

$("#addDevice").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDeviceForm").show();
});

$("#modDevice").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#modDeviceForm").show();
});

$("#updateDevice").click(function (e) {
	e.preventDefault();
	hideAllForm();
	$("#addDoctorForm").show();
});

$("#btnSearchModDocForm").click(function (e) {
	e.preventDefault();
	$("#modDocInfoForm").show();
});

function hideAllOption() {
	$(".optionBar").hide();
	$(".optionBar .active").removeClass("active");
}

function hideAllForm() {
	$("form").hide();
}
