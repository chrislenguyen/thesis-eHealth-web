const CONNECTION_ERROR = 1;
const INVALID_LOGIN = 2;
// const role_control

// console.log(setting);

$("#login-button").click(function (e) {
	e.preventDefault();

	const username = $("#name").val();
	const password = $("#pass").val();

	data = { username, password };

	$.ajax({
		type: "POST",
		url: "/login-data",
		data,
		dataType: "json",
		success: function (response) {
			if (response.error === INVALID_LOGIN) {
				// console.log(response.error);
				console.log("INVALID");
				$("#notification").text("Invalid username or password");
			} else {
				window.location.replace(
					window.location.href + response.transition
				);
			}
		},
	});
});
