const mongoose = require("mongoose");
const emailSchema = mongoose.Schema({
	userId: String,
	to: String,
	from: String,
	subject: String,
	message: String,
	opened: {
		type: Boolean,
		default: false,
	},
	isSpam: {
		type: Boolean,
		default: false,
	},
});

const EmailModel = mongoose.model("email", emailSchema);

module.exports = { EmailModel };
