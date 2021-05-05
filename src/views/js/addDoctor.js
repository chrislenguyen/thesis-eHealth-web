$("#submitBtn").on("click", function () {
	if (
		$("#addDoctorForm :input:empty").filter(function () {
			return $.trim($(this).val()).length == 0;
		}).length == 0 &&
		$("#hos").val() !== "" &&
		$("#dep").val() !== ""
	) {
		var data = {};
		$("#addDoctorForm input, #addDoctorForm select").each(function () {
			var input = $(this);
			var index = input.attr("id");
			data[index] = input.val();
		});
		$.ajax({
			type: "POST",
			url: "/add-doctor",
			data: data,
			dataType: "json",
			success: function (res) {
				if (res.status == 1) {
					$("#addDoctorForm input, select").val("");
					$("#addSuccessDialog").show();
				}
			},
		});
	} else {
		alert("NOT ENOUGH INPUT");
	}
});
