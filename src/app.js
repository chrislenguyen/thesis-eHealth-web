const express = require("express");
const session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const authenticate = require("./controllers/authenticate");
const getInitAddDoctor = require("./controllers/getInitAddDoctor");
const getInitAddDevice = require("./controllers/getInitAddDevice");
const addDoctor = require("./controllers/addDoctor");
const getInitDoctorInfo = require("./controllers/getInitDoctorInfo");
const getPatientQueue = require("./controllers/getPatientQueue");
const addExam = require("./controllers/addExam");
const deleteQueue = require("./controllers/deleteQueue");
const deleteAbsPatient = require("./controllers/deleteAbsPatient");
const addDevice = require("./controllers/addDevice");
const getExamHistory = require("./controllers/getExamHistory");
const addHospital = require("./controllers/addHospital");
const addBuilding = require("./controllers/addBuilding");
const getRoom = require("./controllers/getRoom");
const addRoom = require("./controllers/addRoom");
const getDepartment = require("./controllers/getDepartment");
const addDepartment = require("./controllers/addDepartment");
const getDeviceStatus = require("./controllers/getDeviceStatus");
const getDoctorRoom = require("./controllers/getDoctorRoom");
const getUnassignedRoom = require("./controllers/getUnassignedRoom");
const assignDoctor = require("./controllers/assignDoctor");

const app = express();
const port = process.env.PORT || 3000;

const viewPath = path.join(__dirname, "../src/views");
const partialsPath = path.join(__dirname, "../src/views/partials");

const CONNECTION_ERROR = 1;
const ABSENT = "1";
const DOCTOR = "2";
const ADMIN = "3";
const INVALID_LOGIN = 2;
const LOG_OUT = "1";
const NO_DATA = JSON.stringify({
	noDataFlag: 1,
});
const errorConnection = JSON.stringify({
	error: CONNECTION_ERROR,
	data: undefined,
});
const errorValidating = JSON.stringify({
	error: INVALID_LOGIN,
	data: undefined,
});

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(viewPath));
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);

app.post("/logout", (req, res) => {
	if (req.body.logout === LOG_OUT) {
		req.session.destroy((err) => {
			console.log("SESSION DESTROYED");
		});
	}
});

app.post("/login-data", (req, res) => {
	authenticate(
		req.body,
		(err, validFlag, { username, role, transition } = {}) => {
			// console.log(validFlag);
			if (err) {
				res.end(errorConnection);
			} else if (!validFlag) {
				res.end(errorValidating);
			} else {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.role = role;
				res.end(
					JSON.stringify({
						error: undefined,
						transition,
					})
				);
			}
		}
	);
});

app.post("/add-doctor", (req, res) => {
	addDoctor(req.body, (status) => {
		res.send({ status });
	});
});

app.post("/add-device", (req, res) => {
	addDevice(req.body, (status) => {
		// console.log(status);
		res.send({ status });
	});
});

app.post("/add-hospital", (req, res) => {
	// console.log(req.body);
	addHospital(req.body, (status) => {
		res.send({ status });
	});
});

app.post("/add-building", (req, res) => {
	addBuilding(req.body, (status) => {
		res.send({ status });
	});
});

app.post("/add-room", (req, res) => {
	addRoom(req.body, (status) => {
		res.send({ status });
	});
});

app.post("/add-department", (req, res) => {
	addDepartment(req.body, (status) => {
		res.send({ status });
	});
});

app.post("/del-building", (req, res) => {
	console.log(req.body);
});

app.post("/get-room-info", (req, res) => {
	getRoom(req.body, (err, data) => {
		if (err) {
			return console.log("ERROR GET ROOM INFO");
		}
		res.send(data);
	});
});

app.post("/get-doctor-room-info", (req, res) => {
	getDoctorRoom(req.body, (err, data) => {
		if (err) {
			return console.log("ERROR GET DOCTOR ROOM INFO");
		}
		res.send(data);
	});
});

app.post("/get-department-info", (req, res) => {
	getDepartment(req.body, (err, data) => {
		if (err) {
			return console.log("ERROR GET DEPARTMENT INFO");
		}
		res.send(data);
	});
});

app.post("/get-device-status", (req, res) => {
	getDeviceStatus((err, data) => {
		if (err) {
			return console.log("ERROR GET DEVICE STATUS");
		}
		res.send(data);
	});
});

app.post("/get-unassigned-room", (req, res) => {
	getUnassignedRoom(req.body, (err, data) => {
		if (err) {
			return console.log("ERROR GET UNASSIGNED ROOM");
		}
		res.send(data);
	});
});

app.post("/assign-doctor-room", (req, res) => {
	assignDoctor(req.body, (status) => {
		res.send({ status });
	});
});

app.get("", (req, res) => {
	if (req.session.loggedin) {
		console.log(req.session.role);
		switch (req.session.role) {
			case DOCTOR:
				res.redirect("home");
				break;
			case ADMIN:
				res.redirect("manage");
				break;
			default:
				res.redirect("error");
				break;
		}
	} else {
		res.render("login", {
			title: "Login",
		});
	}
});

app.get("/error", (req, res) => {
	res.render("error", {
		title: "Error",
	});
});

app.get("/manage", (req, res) => {
	if (req.session.loggedin && req.session.role == ADMIN) {
		res.render("manage", {
			title: "Manage",
		});
	} else {
		res.redirect("error");
	}
});

app.get("/init-add-doctor", (req, res) => {
	getInitAddDoctor((err, data) => {
		res.send(data);
	});
});

app.get("/init-add-device", (req, res) => {
	getInitAddDevice((err, data) => {
		res.send(data);
	});
});

app.get("/home", (req, res) => {
	if (req.session.loggedin && req.session.role == DOCTOR) {
		res.render("home", {
			title: "App",
		});
	} else {
		res.render("error", {
			title: "ERROR",
		});
	}
});

app.get("/init-doctor-info", (req, res) => {
	getInitDoctorInfo(req.session.username, (err, data) => {
		if (err) {
			res.send(err);
		} else {
			// console.log(data);
			req.session.docId = data.docId;
			req.session.hosId = data.hosId;
			res.send(data);
		}
	});
});

app.get("/get-exam-history", (req, res) => {
	if (req.query.newPatientFlag == 1) {
		return res.send({
			msg: "NEW PATIENT, NO RECORD AVAILABLE",
		});
	}
	patientInfo = {
		pId: req.session.pId,
	};
	getExamHistory(patientInfo, (examHistory) => {
		res.send({ examHistory });
	});
});

app.post("/get-patient-info", (req, res) => {
	getPatientQueue(req.body.buildingCd, req.body.roomCd, (err, data) => {
		if (err) {
			res.send(err);
		} else {
			// console.log(data);

			if (data !== undefined) {
				if (data[0].validFlag == 1) {
					adaStr =
						data[0].orderNo +
						"-" +
						buildingCd +
						"-" +
						roomCd +
						"-" +
						data[0].phoneNo;
					fetch(
						"https://io.adafruit.com/api/v2/khuonglna99/feeds/sms.queueinfo/data",
						{
							method: "post",
							body: '{"value": "' + adaStr + '"}',
							headers: {
								"X-AIO-Key": settingAda["X-AIO-KEY"],
								"Content-Type": "application/json",
							},
						}
					);
				}
				// console.log(data[0]);
				req.session.pId = data[0].pId;
				req.session.sId = data[0].sId;
				req.session.orderNo = data[0].orderNo;
				req.session.buildingCd = req.body.buildingCd;
				req.session.roomCd = req.body.roomCd;
				res.send(data);
			} else {
				res.send(NO_DATA);
			}
		}
	});
});

app.post("/add-exam-info", (req, res) => {
	var examData = req.body;
	examData["pId"] = req.session.pId;
	examData["sId"] = req.session.sId;
	examData["docId"] = req.session.docId;
	examData["hosId"] = req.session.hosId;
	//TODO
	console.log(examData);
	// Handle throw exception when out of session
	addExam(examData, (procRes) => {
		// console.log(procRes);
		//TODO
		// Handle fail add exam
		res.send({
			procRes,
		});
		// console.log(err);
	});
	// console.log(req.body);
});

app.post("/delete-absent-patient", (req, res) => {
	data = req.body;
	patientInfo = {
		pId: req.session.pId,
		sId: req.session.sId,
		hosId: req.session.hosId,
		buildingCd: req.session.buildingCd,
		roomCd: req.session.roomCd,
		orderNo: req.session.orderNo,
	};
	console.log(patientInfo);
	if (data.newPatientFlag === ABSENT) {
		deleteQueue(patientInfo, (delQueueRes) => {
			if (delQueueRes) {
				deleteAbsPatient(patientInfo, (delPatientRes) => {
					res.send({ delPatientRes });
				});
			} else {
				//TODO
				//Handle delete temp patient fail
			}
		});
		// console.log(patientInfo);
	} else {
		deleteQueue(patientInfo, (delQueueRes) => {
			if (delQueueRes) {
				console.log(delQueueRes);
				res.send({ delQueueRes });
			} else {
				// TODO
				// Handle delete queue absent patient
			}
		});
	}
});

app.get("*", (req, res) => {
	res.render("error", {
		title: "Error",
	});
});

app.listen(port, () => {
	console.log("Server started, port " + port);
});
