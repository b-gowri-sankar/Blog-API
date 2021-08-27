const app = require("express");
const User = require("../models/User");
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
			const updatedUser = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(401).json("You can update only your account");
	}
});

//delete

module.exports = router;
