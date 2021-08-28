const app = require("express");
const Post = require("../models/Post");
const router = app.Router();

//@desc Create a post
//POST  api/posts

router.post("/", async (req, res) => {
	console.log("create post method is called");
	const newPost = await new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (err) {
		return res.status(500).json(err);
	}
});

module.exports = router;
