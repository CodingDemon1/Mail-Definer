const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { EmailModel } = require("../models/email.model");
const { UserModel } = require("../models/user.model");

const getEmails = async (req, res) => {
	try {
		let userId = req.body.userId;
		const getUser = await UserModel.findOne({ _id: userId });
		console.log(getUser);
		const getEmail = getUser.email;
		// console.log(getEmail);
		const data = await EmailModel.find({ to: getEmail, isSpam: false });

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
const getSentMails = async (req, res) => {
	try {
		let userId = req.body.userId;
		const getUser = await UserModel.findOne({ _id: userId });
		// console.log(getUser);
		const getEmail = getUser.email;
		// console.log(getEmail);
		const data = await EmailModel.find({ from: getEmail });
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const getSpams = async (req, res) => {
	try {
		// console.log(SpamCliked);
		let userId = req.body.userId;
		const getUser = await UserModel.findOne({ _id: userId });
		// console.log(getUser);
		const getEmail = getUser.email;
		// console.log(getEmail);
		const data = await EmailModel.find({ to: getEmail, isSpam: true });

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
// to: String,
// 	from: String,
// 	subject: String,
// 	message: Number,
const sendEmail = async (req, res) => {
	try {
		const { from, to, subject, message, userId } = req.body;
		let newMail = {
			from,
			to,
			subject,
			message,
			userId,
		};
		// console.log(newMail);
		let newMsg = new EmailModel(newMail);
		await newMsg.save();
		res.status(200).json({ msg: "Mail Sent" });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const seenMail = async (req, res) => {
	try {
		let userId = req.body.userId;
		let id = req.params.id;

		// const data = await EmailModel.findOne({ _id: id });
		await EmailModel.findByIdAndUpdate(id, { opened: true });
		res.status(200).send({ msg: "Done" });
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};

const spamMail = async (req, res) => {
	try {
		let userId = req.body.userId;
		let id = req.params.id;

		const data = await EmailModel.findOne({ _id: id });

		await EmailModel.findByIdAndUpdate(id, { isSpam: true });
		res.status(200).send({ msg: "Done" });
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};
module.exports = {
	getEmails,
	sendEmail,
	seenMail,
	spamMail,
	getSentMails,
	getSpams,
};
