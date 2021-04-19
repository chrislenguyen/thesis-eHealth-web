const queryGetNextDeviceCd = require("../models/queryGetNextDeviceCd");
const queryAddDevice = require("../models/queryAddDevice");
const addDeviceIotHub = require("../models/addDeviceIotHub");

const addDevice = ({ hosId, buildingCd }, callback) => {
	queryGetNextDeviceCd((err, data) => {
		if (err) {
			return console.log("ERROR GET NEXT DEVICE CODE");
		}
		var data = {
			hosId,
			buildingCd,
			deviceCd: data[0].deviceCd,
		};
		// console.log(data);
		queryAddDevice(data, ({ deviceId }) => {
			addDeviceIotHub(deviceId, (res) => {
				callback(res);
			});
		});
	});
};

module.exports = addDevice;
