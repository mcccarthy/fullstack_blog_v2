/** @format */

const express = require('express');
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

//Post/api/v1/users/register
userRoutes.post('/register', registerCtrl);

//Post/api/v1/users/login
userRoutes.post('/login', loginCtrl);

//GET/api/v1/users/:id
userRoutes.get('/:id', userDetailsCtrl);

//GET/api/v1/users/profile/:id
userRoutes.get('/profile/:id', protected, userProfileCtrl);

//PUT/api/v1/users/profile-photo-upload/:id
userRoutes.put('/profile-photo-upload/:id', uploadProfilePhotoCtrl);

//PUT/api/v1/users/profile-photo-upload/:id
userRoutes.put('/cover-photo-upload/:id', uploadCoverImgCtrl);

//PUT/api/v1/users/update-password/:id
userRoutes.put('/update-password/:id', updatePasswordCtrl);

//PUT/api/v1/users/update/:id
userRoutes.put('/update/:id', updateUserCtrl);

//GET/api/v1/users/logout
userRoutes.get('/logout', logoutCtrl);

module.exports = userRoutes;
