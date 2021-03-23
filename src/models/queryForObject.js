const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const databaseConfig = require("../../setting.json").databaseConfig;

const queryForObject = (queryStatement, callback) => {
	var connection = new Connection(databaseConfig);
	connection.on("connect", function (err) {
		// If no error, then good to proceed.
		if (err) {
			return callback(err, undefined);
		}
		executeStatement(queryStatement);
	});

	connection.on("error", () => {
		connection.close();
	});

	connection.connect();
	function executeStatement(query) {
		let request = new Request(query, function (err, rowCount, rows) {
			if (err) {
				return callback(err, undefined);
			} else {
				// console.log(rowCount);
				var data = "";
				rows.forEach((e) => {
					data += e[0].value;
					// console.log(e[0].value);
				});
				callback(undefined, JSON.parse(data));
			}
		});
		connection.execSql(request);
	}
};

module.exports = queryForObject;
