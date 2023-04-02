const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRegistration = async (req, res) => {
	try {
		// console.log(req);
		const { email, name, pass, age } = req.body;
		bcrypt.hash(pass, 5, async (err, hash) => {
			const newUser = UserModel({ email, name, pass: hash, age });
			await newUser.save();
			res.status(200).send({ msg: "Registration Successful" });
		});
	} catch (error) {
		// console.log(error);
		res.status(400).send({ msg: "Error Ocurred" });
	}
};

const userLogin = async (req, res) => {
	try {
		// console.log(req.body);
		const { email, pass } = req.body;

		// console.log(req.body);
		const user = await UserModel.findOne({ email });

		if (user) {
			// console.log(user);
			bcrypt.compare(pass, user.pass, (err, result) => {
				if (result) {
					res.status(200).send({
						msg: "Login Successful",
						token: jwt.sign({ id: user._id }, "mySecretCode"),
					});
				} else {
					res.status(400).send({ msg: "Wrong Credentials" });
				}
			});
		} else {
			res.status(400).send({ msg: "User Not Found" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};

userDetails = async (req, res) => {
	try {
		let id = req.body.userId;
		let data = await UserModel.findOne({ _id: id });
		// console.log(data);
		res.status(200).json(data);
	} catch (error) {
		res.status(501).send(error.message);
	}
};

module.exports = { userRegistration, userLogin };
