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
