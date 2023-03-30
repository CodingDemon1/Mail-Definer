const userRoute = require("express").Router();
const {
	userRegistration,
	userLogin,
} = require("../controller/user.controller");

userRoute.post("/register", userRegistration);

userRoute.post("/login", userLogin);

module.exports = { userRoute };
