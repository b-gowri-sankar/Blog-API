const app = require("express");
const Post = require("../models/Post");
const router = app.Router();
const mongoose = require("mongoose");

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

//@desc delete the post by id
//DELETE /api/posts/:id

router.delete("/:id", async (req, res) => {
	console.log("Post delete function is deleted");
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json("Not Found");
		if (!post.username === req.body.username) {
			return res.status(401).json("Unauthorized Deletion is NOT Possible");
		}
		try {
			await post.delete();
			return res.status(200).json("The Post has been deleted successfully");
		} catch (err) {
			res.status(500).json(err);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//@desc get post by id
//GET /api/posts/:id

router.get("/:id", async (req, res) => {
	console.log("Get Post By Id is Triggered");
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json("Enter Valid URL");
		}
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json("Not Found");
		return res.status(200).json(post);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//@desc get all post
//GET /api/posts/

router.get("/", async (req, res) => {
	console.log("GET ALL Post is triggered");
	const username = req.query.user;
	const catName = req.query.cat;
	try {
		let posts;
		if (username && catName) {
			posts = await Post.find({
				username,
				categories: {
					$in: [catName],
				},
			});
		} else if (username) {
			posts = await Post.find({ username });
		} else if (catName) {
			posts = await Post.find({
				categories: {
					$in: [catName],
				},
			});
		} else {
			posts = await Post.find();
		}
		res.status(200).json(posts);
	} catch (err) {
		return res.status(500).json(err);
	}
});

module.exports = router;
