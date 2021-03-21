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

const app = express();

const viewPath = path.join(__dirname, "../src/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const CONNECTION_ERROR = 1;
const DOCTOR = "2";
const ADMIN = "3";
const INVALID_LOGIN = 2;
const LOG_OUT = "1";
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
			req.session.pId = data[0].pId;
			req.session.sId = data[0].sId;
			res.send(data);
		}
	});
});

app.post("/add-exam-info", (req, res) => {
	var data = req.body;
	console.log(data);
	data["pId"] = req.session.pId;
	data["sId"] = req.session.sId;
	data["docId"] = req.session.docId;
	data["hosId"] = req.session.hosId;
	addExam(data, (resp) => {
		// console.log(resp);
		res.send({
			resp,
		});
		// console.log(err);
	});
	// console.log(req.body);
});

app.listen(3000, () => {
	console.log("Server started, port 3000");
});
