/** @format */

//post created
const createPostCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Post created',
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
