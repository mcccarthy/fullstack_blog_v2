/** @format */

const Post = require('../../models/posts/Posts');
const User = require('../../models/users/Users');

/** @format */

//post create
const createPostCtrl = async (req, res) => {
	const {title, description, category, user} = req.body;
	try {
		//find the user
		const userId = req.session.userAuth;
		const userFound = await User.findById(userId);
		//create the post
		const postCreated = await Post.create({
			title,
			description,
			category,
			user: userFound._id,
		});
		//push post created into array of user's post
		userFound.posts.push(postCreated._id);
		//resave user
		await userFound.save();
		res.json({
			status: 'success',
			data: postCreated,
		});
	} catch (error) {
		res.json(error);
	}
};

//all posts
const fetchPostsCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Post list',
		});
	} catch (error) {
		res.json(error);
	}
};

//details
const fetchPostCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Post details',
		});
	} catch (error) {
		res.json(error);
	}
};

//delete
const deletePostCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Post deleted',
		});
	} catch (error) {
		res.json(error);
	}
};

//update
const updatePostCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Post updated',
		});
	} catch (error) {
		res.json(error);
	}
};

module.exports = {
	createPostCtrl,
	fetchPostsCtrl,
	fetchPostCtrl,
	deletePostCtrl,
	updatePostCtrl,
};
