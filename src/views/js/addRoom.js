$("#addRoomModal").on("hidden.bs.modal", function () {
	$(":input", this).val("");
});

$("#buildingCodeAddRoomForm").change(function (e) {
	e.preventDefault();
	clearRoomTable();
	if (this.value !== "" && $("#hosIdAddRoomForm").val() !== "") {
		$("#addRoomForm .btn").prop("disabled", false);
		data = {
			hosId: $("#hosIdAddRoomForm").val(),
			bCd: this.value,
		};
		$.ajax({
			type: "post",
			url: "/get-room-info",
			data,
			dataType: "json",
			success: function (response) {
				// console.log(response);
				response.forEach((room) => {
					appendRoomTable(room);
				});
			},
		});
	}
});

$("#btnAddRoomModal").click(function (e) {
	e.preventDefault();
	if (
		$("#addRoomModal :input:empty").filter(function () {
			return $.trim($(this).val()).length == 0;
		}).length == 0
	) {
		data = {
			hosId: $("#hosIdAddRoomForm").val(),
			bCd: $("#buildingCodeAddRoomForm").val(),
			roomCd: $("#roomCdModal").val(),
		};
		$.ajax({
			type: "post",
			url: "/add-room",
			data,
			dataType: "json",
			success: function (response) {
				if (response.status == 1) {
					clearRoomTable();
					$.ajax({
						type: "post",
						url: "/get-room-info",
						data,
						dataType: "json",
						success: function (response) {
							response.forEach((room) => {
								appendRoomTable(room);
							});
							$("#addSuccessDialog").show();
							return $("#addRoomModal").modal("hide");
						},
					});
				}
			},
		});
	}
});

function clearRoomTable() {
	$("#roomTable tbody").empty();
}

function appendRoomTable(data) {
	$("#roomTable tbody").loadTemplate("#tmplRoomTableRow", data, {
		append: true,
	});
	removeRoom();
}

function removeRoom() {
	$(".btnDelRoom")
		.off()
		.click(function (e) {
			var deleteRoom = {
				roomCd: $(this).closest("td").prev("td").text().trim(),
			};
			$.ajax({
				type: "POST",
				url: "/del-room",
				data: deleteRoom,
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
