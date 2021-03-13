const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const databaseConfig = require('../../setting.json').databaseConfig;

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
		request = new Request(query, function (err) {
			if (err) {
				callback(err, undefined);
			}
		});
		connection.execSql(request);

		request.on("row", function (columns) { 
			columns.forEach(e => {
				callback(undefined, e.value)
			});
		})
	}
};

module.exports = queryForObject;
