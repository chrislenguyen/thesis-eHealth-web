$("#btnAddDeviceForm").click(function (e) {
	e.preventDefault();
	var data = {};
	$("#addDeviceForm select").each(function () {
		var input = $(this);
		var index = input.attr("name");
		index == "hosBuildingList" ? (index = "hosId") : (index = "buildingCd");
		data[index] = input.val();
	});
	$.ajax({
		type: "POST",
		url: "/add-device",
		data: data,
		dataType: "json",
		success: function (res) {
			if (res.status == 1) {
				$("#addSuccessDialog").show();
			}
		},
	});
});
