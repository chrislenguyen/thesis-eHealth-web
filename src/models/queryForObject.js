const Connection = require("tedious").Connection;
const Request = require("tedious").Request;

const queryForObject = (queryStatement, callback) => {
	var config = {
		server: "hospitaldb.database.windows.net", //update me
		authentication: {
			type: "default",
			options: {
				userName: "JETSON_BOARD", //update me
				password: "Database_Hospital@123", //update me
			},
		},
		options: {
			// If you are on Microsoft Azure, you need encryption:
			encrypt: true,
			database: "HospitalDB", //update me
			rowCollectionOnDone: true,
		},
	};

	var connection = new Connection(config);
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
