/** @format */

//create comment
const createCommentCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Comment created',
		});
	} catch (error) {
		res.json(error);
	}
};

//single comment
const commentDetailsCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Post comments',
		});
	} catch (error) {
		res.json(error);
	}
};

//delete
const deleteCommentsCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Comments deleted',
		});
	} catch (error) {
		res.json(error);
	}
};

//update
const updateCommentsCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'Comments updated',
		});
	} catch (error) {
		res.json(error);
	}
};

module.exports = {
	createCommentCtrl,
	commentDetailsCtrl,
	deleteCommentsCtrl,
	updateCommentsCtrl,
};
