const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const multer = require("multer");

dotenv.config();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, "hello.png");
	},
});

const upload = multer({ storage: storage });

app.use(express.json());
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File has been upload successfully");
});
app.use("/api/auth", authRoute);
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));

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
