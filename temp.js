const fetch = require("node-fetch");

data = [
	{
		stt: 1,
		roomCd: 2,
		bCd: 3,
		phoneNo: 1234,
	},
];

temp = '{"value" : ' + JSON.stringify(data) + " }";
temp = '{"value" : ' + '"3"' + " }"

console.log(temp);
// console.log(JSON.parse(temp));

try {
	fetch(
		"https://io.adafruit.com/api/v2/khuonglna99/feeds/sms.queueinfo/data",
		{
			method: "post",
			body: temp,
			headers: {
				"X-AIO-Key": "aio_qrEw29oUIvN4ch3VeiOQJzGgiwdz",
				"Content-Type": "application/json",
			},
		}
	)
		.then((res) => res.json())
		.then((json) => console.log(json));
} catch (error) {
	console.log(error);
}
