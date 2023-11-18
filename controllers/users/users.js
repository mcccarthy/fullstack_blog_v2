/** @format */

const bcrypt = require('bcryptjs');
const User = require('../../models/users/Users');

//register
const registerCtrl = async (req, res) => {
	const {fullname, email, password} = req.body;
	try {
		//1. check if user exist (email)
		const userFound = await User.findOne({email});
		//throw and error
		if (userFound) {
			return res.json({status: 'failed', data: 'User already Exist'});
		}
		//Hash password
		const salt = await bcrypt.genSalt(10);
		const passwordHashed = await bcrypt.hash(password, salt);
		//register user
		const user = await User.create({
			fullname,
			email,
			password: passwordHashed,
		});
		res.json({
			status: 'success',
			data: user,
		});
	} catch (error) {
		res.json(error);
	}
};

//login
const loginCtrl = async (req, res) => {
	const {email, password} = req.body;
	try {
		//check if email exist
		const userFound = await User.findOne({email});
		if (!userFound) {
			return res.json({
				status: 'failed',
				data: 'Invalid login credentials',
			});
		}
		//verify password
		const isPasswordValid = await bcrypt.compare(
			password,
			userFound.password
		);
		if (!isPasswordValid) {
			//throw an error
			if (userFound) {
				return res.json({
					status: 'failed',
					data: 'Invalid  login credentials',
				});
			}
		}
		res.json({
			status: 'success',
			data: userFound,
		});
	} catch (error) {
		res.json(error);
	}
};

//user details
const userDetailsCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'User Details',
		});
	} catch (error) {
		res.json(error);
	}
};

//user profile
const userProfileCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'User Profile',
		});
	} catch (error) {
		res.json(error);
	}
};

//upload profile photo
const uploadProfilePhotoCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'User profile image upload',
		});
	} catch (error) {
		res.json(error);
	}
};

//upload cover photo
const uploadCoverImgCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'User cover image upload',
		});
	} catch (error) {
		res.json(error);
	}
};

//update password
const updatePasswordCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'User password update',
		});
	} catch (error) {
		res.json(error);
	}
};

//update user
const updateUserCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'User update',
		});
	} catch (error) {
		res.json(error);
	}
};

//logout
const logoutCtrl = async (req, res) => {
	try {
		res.json({
			status: 'success',
			user: 'User logout',
		});
	} catch (error) {
		res.json(error);
	}
};

module.exports = {
	registerCtrl,
	loginCtrl,
	userDetailsCtrl,
	userProfileCtrl,
	uploadProfilePhotoCtrl,
	uploadCoverImgCtrl,
	updatePasswordCtrl,
	updateUserCtrl,
	logoutCtrl,
};
