const express = require("express");
const session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const authenticate = require("./controllers/authenticate");
const getInitAddDoctor = require("./controllers/getInitAddDoctor");
const addDoctor = require("./controllers/addDoctor");
const getInitDoctorInfo = require("./controllers/getInitDoctorInfo");

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
			// res.send()
		});
	}
});

app.post("/login-data", (req, res) => {
	// console.log(req.body);
	authenticate(
		req.body,
		(err, validFlag, { username, role, transition } = {}) => {
			if (err) {
				res.end(errorConnection);
			} else if (!validFlag) {
				res.end(errorValidating);
			} else {
				// console.log(role);
				// console.log(transition);
				// const roleParam = role
				req.session.loggedin = true;
				req.session.username = username;
				req.session.role = role;
				// console.log(setting);
				res.end(
					JSON.stringify({
						error: undefined,
						transition,
					})
				);
				// res.end();
			}
		}
	);
});

app.post("/add-doctor-data", (req, res) => {
	addDoctor(req.body, (err, res) => {});
	res.send();
});

app.post("/home-doctor-data", (req, res) => {});

app.get("", (req, res) => {
	if (req.session.loggedin) {
		console.log(req.session.role);
		switch (req.session.role) {
			case DOCTOR:
				res.render("home", {
					title: "App",
				});
				break;
			case ADMIN:
				res.render("manage", {
					title: "Manage",
				});
				break;
			default:
				res.render("error", {
					title: "ERROR",
				});
				break;
		}
	} else {
		res.render("login", {
			title: "Login",
		});
	}
});

app.get("/manage", (req, res) => {
	if (req.session.loggedin) {
		res.render("manage", {
			title: "Manage",
		});
	} else {
		res.render("error", {
			title: "ERROR",
		});
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
	// res.render("home");
});

app.get("/init-doctor-info", (req, res) => {
	getInitDoctorInfo(req.session.username, (err, data) => {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	})
})

app.listen(3000, () => {
	console.log("Server started, port 3000");
});
