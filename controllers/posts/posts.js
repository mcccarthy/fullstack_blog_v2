/** @format */

const Post = require('../../models/posts/Posts');
const User = require('../../models/users/Users');
const appErr = require('../../utils/appErr');

/** @format */

// create
const createPostCtrl = async (req, res, next) => {
	const {title, description, category, user} = req.body;
	try {
		if (!title || !description || !category || !req.file) {
			return next(appErr('All fields are required'));
		}
		//find the user
		const userId = req.session.userAuth;
		const userFound = await User.findById(userId);
		//create the post
		const postCreated = await Post.create({
			title,
			description,
			category,
			user: userFound._id,
			image: req.file.path,
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
		next(appErr(error.message));
	}
};

//all posts
const fetchPostsCtrl = async (req, res, next) => {
	try {
		const posts = await Post.find();
		res.json({
			status: 'success',
			data: posts,
		});
	} catch (error) {
		next(appErr(error.message));
	}
};

//details
const fetchPostCtrl = async (req, res, next) => {
	try {
		//get the id from params
		const id = req.params.id;
		//find the post
		const post = await Post.findById(id);
		res.json({
			status: 'success',
			data: post,
		});
	} catch (error) {
		next(appErr(error.message));
	}
};

//delete
const deletePostCtrl = async (req, res, next) => {
	try {
		//find the post
		const post = await Post.findById(req.params.id);
		//check if the post belongs to the user
		if (post.user.toString() !== req.session.userAuth.toString()) {
			return next(
				appErr('You are not authorized to delete this post!', 403)
			);
		}

		//delete post
		await Post.findByIdAndDelete(req.params.id);
		res.json({
			status: 'success',
			data: 'Post deleted successfully',
		});
	} catch (error) {
		next(appErr(error.message));
	}
};


//update
const updatePostCtrl = async (req, res, next) => {
	const {title, description, category} = req.body;

	try {
		//find the post
		const post = await Post.findById(req.params.id);
		//check if the post belongs to the user
		if (post.user.toString() !== req.session.userAuth.toString()) {
			return next(
				appErr('You are not authorized to update this post!', 403)
			);
		}
		//update
		const postUpdated = await Post.findByIdAndUpdate(
			req.params.id,
			{
				title,
				description,
				category,
				image: req.file.path,
			},
			{
				new: true,
			}
		);
		res.json({
			status: 'success',
			data: postUpdated,
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
