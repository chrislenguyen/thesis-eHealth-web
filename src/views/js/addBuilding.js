var changeFlag = false;
var changeBuilding = [];

$("#addBuildingModal").on("hidden.bs.modal", function () {
	$(":input", this).val("");
});

$("#hosListAddBuildingForm").on("change", function () {
	clearBuildingTable();
	if (this.value !== "") {
		$("#addBuildingForm .btn").prop("disabled", false);
		hosBuildingSelectOption
			.find((hos) => hos.hosId == this.value)
			.building.forEach((b) => {
				if (b.bCd !== undefined) {
					appendBuildingTable(b);
				}
			});
	}
});

$("#btnAddBuildingModal").click(function (e) {
	e.preventDefault();
	if (
		$("#addBuildingModal :input:empty").filter(function () {
			return $.trim($(this).val()).length == 0;
		}).length == 0
	) {
		$.ajax({
			type: "POST",
			url: "/add-building",
			data: {
				hosId: $("#hosListAddBuildingForm").val(),
				bCd: $("#buildingCdModal").val(),
			},
			dataType: "json",
			success: function (res) {
				console.log(res);
				if (res.status == 1) {
					$.ajax({
						type: "get",
						url: "/init-add-device",
						success: function (response) {
							hosBuildingSelectOption = response;
							$("#addSuccessDialog").show();
							appendBuildingTable({
								bCd: $("#buildingCdModal").val(),
							});
							$(":input", this).val("");
							return $("#addBuildingModal").modal("hide");
						},
					});
				}
			},
		});
	} else {
		//TODO
		//Handle no input
	}
});

$("textarea").focus(function (e) {
	e.preventDefault();
	console.log($(".myTd").text());
});

function clearBuildingTable() {
	$("#buildingTable tbody").empty();
}

function appendBuildingTable(data) {
	$("#buildingTable tbody").loadTemplate("#tmplBuildingTableRow", data, {
		append: true,
	});
	removeBuilding();
}

function removeBuilding() {
	$(".btnDelBuilding")
		.off()
		.click(function (e) {
			var deleteBuilding = {
				bCd: $(this).closest("td").prev("td").text().trim(),
			};
			$.ajax({
				type: "POST",
				url: "/del-building",
				data: deleteBuilding,
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
