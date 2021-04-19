var Registry = require("azure-iothub").Registry;

const IOT_HUB_CONNECTION_STRING =
	"HostName=thesisehealthcare.azure-devices.net;SharedAccessKeyName=serverRight;SharedAccessKey=ljbaoEH304RNLuxtNC6a/TIbQ7NKbh7OfsQ5RKfbx7M=";

var registry = Registry.fromConnectionString(IOT_HUB_CONNECTION_STRING);

const addDeviceIotHub = (deviceId, callback) => {
	var device = {
		deviceId,
	};

	registry.create(device, function (err, deviceInfo, res) {
		if (err) return console.log("ERROR ADD DEVICE TO IOT HUB");
		callback(1);
	});
};
