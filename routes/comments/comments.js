/** @format */

const express = require('express');
const {
	createCommentCtrl,
	commentDetailsCtrl,
	updateCommentsCtrl,
	deleteCommentsCtrl,
} = require('../../controllers/comments/comments');

const commentRoutes = express.Router(); // Create an instance of Express Router

// POST /api/v1/comments
commentRoutes.post('/', createCommentCtrl);

// GET /api/v1/comments/:id
commentRoutes.get('/:id', commentDetailsCtrl);

// PUT /api/v1/comments/:id
commentRoutes.put('/:id', updateCommentsCtrl);

// DELETE /api/v1/comments/:id
commentRoutes.delete('/:id', deleteCommentsCtrl);

module.exports = commentRoutes;
