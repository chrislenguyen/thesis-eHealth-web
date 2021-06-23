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

	connection.on("end", () => connection.close());

	connection.connect();
	function executeStatement(query) {
		let request = new Request(query, function (err, rowCount, rows) {
			if (err) {
				connection.close()
				return callback(err, undefined);
			} else {
				connection.close()
				// console.log(rowCount);
				var data = "";
				rows.forEach((e) => {
					data += e[0].value;
					// console.log(e[0].value);
				});
				// console.log(data);
				data.length > 0
					? callback(undefined, JSON.parse(data))
					: callback(undefined, undefined);
			}
		});
		connection.execSql(request);
	}
};

module.exports = queryForObject;
