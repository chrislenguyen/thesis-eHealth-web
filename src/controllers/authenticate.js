const queryForAuthentication = require("../models/queryForAuthentication.js");
const role_setting = require("../../setting.json").role_setting
// console.log(role_setting[0]);
const authenticate = (loginData, callback) => {
	var validFlag = false;
	queryForAuthentication(
		loginData.username,
		loginData.password,
		(err, data) => {
			// console.log(data.Role);
			if (err) {
				callback(err, undefined, undefined);
			} else if (data.length === 0) {
				callback(err, validFlag, undefined);
			} else {
                validFlag = true
				var transition;
				// console.log(data[0]);
				// console.log(data.role);
				for (var i = 0; i < role_setting.length; i++) {
					
					if (role_setting[i].role === data.role) {
						transition = role_setting[i].screen
					}
				}
				callback(undefined, validFlag, {
                    username: data.username,
                    role: data.role,
					transition
                });
			}
		}
	);
};

module.exports = authenticate;
