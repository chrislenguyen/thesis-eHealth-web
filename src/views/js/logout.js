const LOG_OUT = 1;

$("#logoutBtn").on("click", function () {
	var data = { logout: LOG_OUT };
	// data = JSON.stringify(data)
	console.log(window.location.href);
	$.ajax({
		type: "POST",
		url: "/logout",
		data,
	});
	window.location.replace(window.location.origin);
	// console.log("pressed");
});
