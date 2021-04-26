$("#btnSubmitAddHospital").click(function (e) {
	e.preventDefault();
	var data = {};
	$("#addHosForm input").each(function () {
		var input = $(this);
		var index = input.attr("id");
		data[index] = input.val();
	});
	// console.log(data);
	$.ajax({
		type: "POST",
		url: "/add-hospital",
		data: data,
		dataType: "json",
		success: function (res) {
			// console.log(res);
			if (res.status == 1) {
				$("#addSuccessDialog").show();
			}
		},
	});
});
