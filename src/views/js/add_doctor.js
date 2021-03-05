var selectOption;

$.ajax({
	type: "get",
	url: "/init-add-doctor",
	// data: "data",
	// dataType: "dataType",
	success: function (response) {
		// console.log(response);
		selectOption = JSON.parse(response);
		// console.log(selectOption);
		selectOption.forEach((e) => {
			// console.log(e);
			$("#hos").append(new Option(e.hosName, e.hosId));
		});
	},
});

$("#hos").on("change", function () {
	// console.log(this.value);
	if (this.value !== undefined) {
		$("#dep").find("option").remove().end();
		$("#dep").append(new Option("", ""));
		var dep;
		// console.log(selectOption);
		selectOption.forEach((e) => {
			// console.log(e);
			if (e.hosId == this.value) {
				dep = e.department;
			}
		});

		// console.log(dep);
		dep.forEach((e) => {
			// console.log(e);
			$("#dep").append(new Option(e.depName, e.depId));
		});
	} else {
		$("#dep").find("option").remove().end();
		$("#dep").append(new Option("", ""));
	}
});

$("#submitBtn").on("click", function () {
	var data = {};
	$("#addInpatientForm input, #addInpatientForm select").each(function () {
		var input = $(this);
		var index = input.attr("id");
		data[index] = input.val();
	});
	// console.log(data);
	// console.log(JSON.stringify(data));
	$.ajax({
		type: "POST",
		url: "/add-doctor-data",
		data: data,
		dataType: "json",
		success: function (res) {
			// console.log(res);
		},
	});
});
