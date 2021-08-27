const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//@desc Registering user
//POST /register

router.post("/register", async (req, res) => {
	console.log(req.body);
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPass,
		});

		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
});

//@desc Login User
//POST /login
router.post("/login", async (req, res) => {
	try {
		console.log("it is login");
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(400).json("wrong credentials");
		const validated = await bcrypt.compare(req.body.password, user.password);
		!validated && res.json("Wrong Credentials");
		const { password, ...others } = user._doc;
		return res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
