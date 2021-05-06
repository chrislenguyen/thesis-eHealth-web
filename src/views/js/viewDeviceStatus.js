var active = '<span class="active">●</span>';
var inactive = '<span class="inactive">●</span>';

function loadDeviceStatusTable() {
	$("#deviceStatusTable tbody").empty();
	$.ajax({
		type: "post",
		url: "/get-device-status",
		success: function (response) {
			response.forEach((device) => {
				if (device.validFlag == 1) {
					device.validFlag = active;
				} else {
					device.validFlag = inactive;
				}
				appendDeviceStatusTable(device);
			});
		},
	});
}

function appendDeviceStatusTable(data) {
	$("#deviceStatusTable tbody").loadTemplate(
		"#tmplDeviceStatusTableRow",
		data,
		{
			append: true,
		}
	);
	removeDepartment();
}
