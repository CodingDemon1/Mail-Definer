const emailRouter = require("express").Router();
const {
	getEmails,
	sendEmail,
	seenMail,
	spamMail,
	getSentMails,
	getSpams,
} = require("../controller/emails.controller");

emailRouter.get("/", getEmails);
emailRouter.post("/sendMail", sendEmail);
emailRouter.patch("/seen/:id", seenMail);
emailRouter.patch("/spam/:id", spamMail);
emailRouter.get("/sendbox", getSentMails);
emailRouter.get("/getSpams", getSpams);

module.exports = { emailRouter };
