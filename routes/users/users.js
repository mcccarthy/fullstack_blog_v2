/** @format */

const express = require('express');
const multer = require('multer');
const storage = require('../../config/cloudinary');
const {
	registerCtrl,
	loginCtrl,
	userDetailsCtrl,
	userProfileCtrl,
	uploadProfilePhotoCtrl,
	uploadCoverImgCtrl,
	updatePasswordCtrl,
	updateUserCtrl,
	logoutCtrl,
} = require('../../controllers/users/users');
const protected = require('../../middlewares/protected');
const userRoutes = express.Router();

// instance of multer
const upload = multer({storage});

// Post/api/v1/users/register
userRoutes.post('/register', registerCtrl);

// Post/api/v1/users/login
userRoutes.post('/login', loginCtrl);

// GET/api/v1/users/profile/
userRoutes.get('/profile', protected, userProfileCtrl);

// PUT/api/v1/users/profile-photo-upload/
userRoutes.put(
	'/profile-photo-upload/',
	protected,
	upload.single('profile'),
	uploadProfilePhotoCtrl
);

// PUT /api/v1/users/cover-photo-upload/:id
userRoutes.put(
	'/cover-photo-upload/:id',
	upload.single('coverPhoto'), // Fix the use of userRoutes instead of router here
	uploadCoverImgCtrl
);

// PUT/api/v1/users/update-password/:id
userRoutes.put('/update-password/:id', updatePasswordCtrl);

// PUT/api/v1/users/update/:id
userRoutes.put('/update/:id', updateUserCtrl);

// GET/api/v1/users/:id
userRoutes.get('/:id', userDetailsCtrl);

// GET/api/v1/users/logout
userRoutes.get('/logout', logoutCtrl);

module.exports = userRoutes;
