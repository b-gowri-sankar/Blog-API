const app = require("express");
const Category = require("../models/Category");

const router = app.Router();

router.post("/", async (req, res) => {
	console.log("create category api is triggered");
	try {
		const newCat = await Category(req.body);
		return res.status(200).json(await newCat.save());
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.get("/", async (req, res) => {
	console.log("Get All Categories is triggered");
	try {
		const allCategories = await Category.find();
		return res.status(200).json(allCategories);
	} catch (err) {
		return res.status(500).json(err);
	}
});

module.exports = router;
