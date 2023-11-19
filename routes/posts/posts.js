/** @format */

const express = require('express');
const multer = require('multer');
const storage = require('../../config/cloudinary');

const {
	createPostCtrl,
	deletePostCtrl,
	fetchPostCtrl, // Corrected route handler name
	fetchPostsCtrl,
	updatePostCtrl,
} = require('../../controllers/posts/posts');

const postRoutes = express.Router();
const protected = require('../../middlewares/protected');

//instance of multer
const upload = multer({
	storage,
});

// POST /api/v1/posts
postRoutes.post('/', protected, upload.single('file'), createPostCtrl);

// GET all posts: /api/v1/posts
postRoutes.get('/', fetchPostsCtrl);

// GET single post: /api/v1/posts/:id
postRoutes.get('/:id', fetchPostCtrl);

// DELETE /api/v1/posts/:id
postRoutes.delete('/:id', protected, deletePostCtrl);

// PUT /api/v1/posts/:id
postRoutes.put('/:id', updatePostCtrl);

module.exports = postRoutes;
