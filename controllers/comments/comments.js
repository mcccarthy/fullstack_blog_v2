/** @format */

const Comment = require('../../models/comments/Comment');
const Post = require('../../models/posts/Posts');
const User = require('../../models/users/Users');
const appErr = require('../../utils/appErr');

//create comment
const createCommentCtrl = async (req, res, next) => {
	const {message} = req.body;
	try {
		//find the post
		const post = await Post.findById(req.params.id);
		//create the comment
		const comment = await Comment.create({
			user: req.session.userAuth,
			message,
		});
		//push comment to the post
		post.comments.push(comment._id);
		//find the user
		const user = await User.findById(req.session.userAuth);
		//push the comment into user array
		user.comments.push(comment._id);
		//disable validation
		//save
		await post.save({validateBeforeSave: false});
		await user.save({validateBeforeSave: false});
		res.json({
			status: 'success',
			data: comment,
		});
	} catch (error) {
		next(appErr(error));
	}
};

//single comment
const commentDetailsCtrl = async (req, res, next) => {
	try {
		res.json({
			status: 'success',
			user: 'Post comments',
		});
	} catch (error) {
		next(appErr(error));
	}
};

//delete
const deleteCommentsCtrl = async (req, res, next) => {
	try {
		//find the comment
		const comment = await Comment.findById(req.params.id);
		//check if the post belongs to the user
		if (comment.user.toString() !== req.session.userAuth.toString()) {
			return next(
				appErr('You are not authorized to delete this comment!', 403)
			);
		}

		//delete post
		await Comment.findByIdAndDelete(req.params.id);
		res.json({
			status: 'success',
			data: 'Comment deleted successfully',
		});
	} catch (error) {
		next(appErr(error));
	}
};

//update
const updateCommentsCtrl = async (req, res, next) => {
	try {
		//find the comment
		const comment = await Comment.findById(req.params.id);

		if (!comment) {
			return next(appErr('Comment not found'));
		}
		//check if the post belongs to the user
		if (comment.user.toString() !== req.session.userAuth.toString()) {
			return next(
				appErr('You are not authorized to update this comment!', 403)
			);
		}
		//update
		const commentUpdated = await Comment.findByIdAndUpdate(
			req.params.id,
			{
				message: req.body.message,
			},
			{
				new: true,
			}
		);
		res.json({
			status: 'success',
			data: commentUpdated,
		});
	} catch (error) {
		next(appErr(error));
	}
};

module.exports = {
	createCommentCtrl,
	commentDetailsCtrl,
	deleteCommentsCtrl,
	updateCommentsCtrl,
};
