var hosDepSelectOption;

$.ajax({
	type: "get",
	url: "/init-add-doctor",
	success: function (response) {
		hosDepSelectOption = response;
		hosDepSelectOption.forEach((e) => {
			$('select[name="hosList"]').append(new Option(e.hosName, e.hosId));
		});
	},
});

$('select[name="hosList"]').on("change", function () {
	if (this.value !== undefined) {
		$('select[name="depList"]').find("option").remove().end();
		$('select[name="depList"]').append(new Option("", ""));
		var dep;
		hosDepSelectOption.forEach((e) => {
			if (e.hosId == this.value) {
				dep = e.department;
			}
		});
		dep.forEach((e) => {
			$('select[name="depList"]').append(new Option(e.depName, e.depId));
		});
	} else {
		$('select[name="depList"]').find("option").remove().end();
		$('select[name="depList"]').append(new Option("", ""));
	}
});

$("#submitBtn").on("click", function () {
	var data = {};
	$("#addDoctorForm input, #addDoctorForm select").each(function () {
		var input = $(this);
		var index = input.attr("id");
		data[index] = input.val();
	});
	// console.log(data);
	// console.log(JSON.stringify(data));
	$.ajax({
		type: "POST",
		url: "/add-doctor",
		data: data,
		dataType: "json",
		success: function (res) {
			// console.log(res);
		},
	});
});
