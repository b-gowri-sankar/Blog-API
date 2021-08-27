const app = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const router = app.Router();

//update
router.put("/:id", async (req, res) => {
	console.log("update /:id is executing");
	if (req.params.id === req.body.userId) {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(401).json("You can update only your account");
	}
});

//@desc delete the user by id
//DELETE api/users/:id

router.delete("/:id", async (req, res) => {
	console.log("deleing user router has called");
	if (req.params.id === req.body.userId) {
		try {
			const user = await User.findById(req.params.id);
			try {
				await Post.deleteMany({ username: user.username });
				await User.findByIdAndDelete(req.params.id);
				res.status(200).json("User has been deleted...");
			} catch (err) {
				res.status(500).json(err);
			}
		} catch (err) {
			res.status(401).json("User not found..");
		}
	} else {
		return res.status(401).json("you can only delete your account");
	}
});

module.exports = router;
