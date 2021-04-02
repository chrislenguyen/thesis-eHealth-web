const express = require("express");
const session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const authenticate = require("./controllers/authenticate");
const getInitAddDoctor = require("./controllers/getInitAddDoctor");
const addDoctor = require("./controllers/addDoctor");
const getInitDoctorInfo = require("./controllers/getInitDoctorInfo");
const getPatientQueue = require("./controllers/getPatientQueue");
const addExam = require("./controllers/addExam");
const deleteQueue = require("./controllers/deleteQueue");
const deleteAbsPatient = require("./controllers/deleteAbsPatient");

const app = express();

const viewPath = path.join(__dirname, "../src/views");
const partialsPath = path.join(__dirname, "../templates/partials");

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
const loggedOutSuccess = JSON.stringify({
	data: LOG_OUT,
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

app.post("/add-doctor-data", (req, res) => {
	addDoctor(req.body, (err, res) => {});
	res.send();
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
	if (req.session.loggedin) {
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

app.get("/home", (req, res) => {
	if (req.session.loggedin) {
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
			req.session.docId = data.docId;
			req.session.hosId = data.hospital[0].hosId;
			res.send(data);
		}
	});
});

app.post("/get-patient-info", (req, res) => {
	getPatientQueue(req.body.buildingCd, req.body.roomCd, (err, data) => {
		if (err) {
			res.send(err);
		} else {
			// console.log(data);

			if (data !== undefined) {
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
	console.log(examData);
	examData["pId"] = req.session.pId;
	examData["sId"] = req.session.sId;
	examData["docId"] = req.session.docId;
	examData["hosId"] = req.session.hosId;
	//TODO
	// Handle throw exception when out of session
	addExam(examData, (procRes) => {
		console.log(procRes);
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
	}
});

app.listen(3000, () => {
	console.log("Server started, port 3000");
});
