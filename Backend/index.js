const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");

require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/user", userRoute);

app.listen(PORT, async () => {
	try {
		await connection();
		console.log(`Listening at port - ${PORT}`);
	} catch (error) {
		console.error(error.message);
	}
});
