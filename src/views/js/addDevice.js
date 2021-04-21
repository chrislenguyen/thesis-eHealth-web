var hosBuildingSelectOption;

$.ajax({
	type: "get",
	url: "/init-add-device",
	success: function (response) {
		hosBuildingSelectOption = response;
		hosBuildingSelectOption.forEach((e) => {
			$('select[name="hosListDevForm"]').append(
				new Option(e.hosName, e.hosId)
			);
		});
	},
});

$('select[name="hosListDevForm"]').on("change", function () {
	if (this.value !== undefined) {
		$('select[name="buildingListDevForm"]').find("option").remove().end();
		$('select[name="buildingListDevForm"]').append(new Option("", ""));
		var dep;
		hosBuildingSelectOption.forEach((e) => {
			if (e.hosId == this.value) {
				dep = e.building;
			}
		});
		dep.forEach((e) => {
			$('select[name="buildingListDevForm"]').append(
				new Option(e.bCd, e.bCd)
			);
		});
	} else {
		$('select[name="buildingListDevForm"]').find("option").remove().end();
		$('select[name="buildingListDevForm"]').append(new Option("", ""));
	}
});

$("#btnAddDeviceForm").click(function (e) {
	e.preventDefault();
	var data = {};
	$("#addDeviceForm select").each(function () {
		var input = $(this);
		var index = input.attr("name");
		index == "hosListDevForm" ? (index = "hosId") : (index = "buildingCd");
		data[index] = input.val();
	});
	$.ajax({
		type: "POST",
		url: "/add-device",
		data: data,
		dataType: "json",
		success: function (res) {
			if (res.status == 1) {
				$("#successDialog").show();
			}
		},
	});
});
