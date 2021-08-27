const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

dotenv.config();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", require("./routes/users"));

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("Connection established to mongoose"))
	.catch((err) => console.log(err));

app.listen("5000", () => {
	console.log("Backend is running on port 5000");
});
