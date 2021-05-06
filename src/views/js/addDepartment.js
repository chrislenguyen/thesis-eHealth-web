$("#addDepartmentModal").on("hidden.bs.modal", function () {
	$(":input", this).val("");
});

$("#hosListAddDepartmentForm").on("change", function () {
	clearDepartmentTable();
	if (this.value !== "") {
		$("#addDepartmentForm .btn").prop("disabled", false);
		$.ajax({
			type: "post",
			url: "/get-department-info",
			data: { hosId: this.value },
			dataType: "json",
			success: function (response) {
				response.forEach((department) => {
					appendDepartmentTable(department);
				});
			},
		});
	}
});
var items = [];
$("#btnAddDepartmentModal").click(function (e) {
	var existedFlag = false;
	e.preventDefault();
	if (
		$("#addDepartmentModal :input:empty").filter(function () {
			return $.trim($(this).val()).length == 0;
		}).length == 0
	) {
		$("#departmentTable tr").each(function () {
			var existedDept = $(this).find(".deptName").text().trim();
			if (existedDept == $("#departmentNameModal").val()) {
				existedFlag = true;
				alert("DEPARTMENT EXISTED");
			}
		});
		if (!existedFlag) {
			data = {
				hosId: $("#hosListAddDepartmentForm").val(),
				departmentName: $("#departmentNameModal").val(),
			};
			$.ajax({
				type: "post",
				url: "/add-department",
				data,
				dataType: "json",
				success: function (response) {
					if (response.status == 1) {
						clearRoomTable();
						$.ajax({
							type: "post",
							url: "/get-department-info",
							data,
							dataType: "json",
							success: function (response) {
								response.forEach((department) => {
									appendRoomTable(department);
								});
								$("#addSuccessDialog").show();
								return $("#addDepartmentModal").modal("hide");
							},
						});
					}
				},
			});
		}
	} else {
		//TODO
		//Handle no input
	}
});

function clearDepartmentTable() {
	$("#departmentTable tbody").empty();
}

function appendDepartmentTable(data) {
	$("#departmentTable tbody").loadTemplate("#tmplDepartmentTableRow", data, {
		append: true,
	});
	removeDepartment();
}

function removeDepartment() {
	$(".btnDelDepartment")
		.off()
		.click(function (e) {
			var deleteDepartment = {
				bCd: $(this).closest("td").prev("td").text().trim(),
			};
			$.ajax({
				type: "POST",
				url: "/del-department",
				data: deleteDepartment,
				dataType: "json",
				success: function (res) {
					// console.log(res);
					if (res.status == 1) {
						$("#addSuccessDialog").show();
					}
				},
			});
			e.preventDefault();
			$("tr.selected").removeClass("selected");
			$(this).closest("tr").addClass("selected");
			$("tr.selected").remove();
		});
}
