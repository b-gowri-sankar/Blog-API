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

//@desc update the post by id;
//PUT api/posts

router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		!(post.username === req.body.username) &&
			res.send(401).json("Unauthorized Error");
		try {
			const udpatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(udpatedPost);
		} catch (err) {
			res.status(500).json(err);
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
