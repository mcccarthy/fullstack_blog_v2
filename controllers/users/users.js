/** @format */

const bcrypt = require('bcryptjs');
const User = require('../../models/users/Users');
const appErr = require('../../utils/appErr');

//register
const registerCtrl = async (req, res, next) => {
	const {fullname, email, password} = req.body;
	//check if field is empty
	if (!fullname || !email || !password) {
		return next(appErr('All fields are required'));
	}
	try {
		//1. check if user exist (email)
		const userFound = await User.findOne({email});
		//throw and error
		if (userFound) {
			return next(appErr('User already Exist'));
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
const loginCtrl = async (req, res, next) => {
	const {email, password} = req.body;
	if (!email || !password) {
		return next(appErr('Email and password fields are required'));
	}
	try {
		//check if email exist
		const userFound = await User.findOne({email});
		if (!userFound) {
			return next(appErr('Invalid login credentials'));
		}
		//verify password
		const isPasswordValid = await bcrypt.compare(
			password,
			userFound.password
		);
		if (!isPasswordValid) {
			//throw an error
			return next(appErr('Invalid login credentials'));
		}
		//save user into session
		req.session.userAuth = userFound._id;
		console.log(req.session);
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
		//get userID from params
		const userId = req.params.id;
		//find user
		const user = await User.findById(userId);
		res.json({
			status: 'success',
			data: user,
		});
	} catch (error) {
		res.json(error);
	}
};

//user profile
const userProfileCtrl = async (req, res) => {
	try {
		//get login user
		const userId = req.session.userAuth;
		//find the user
		const user = await User.findById(userId).populate('posts');
		res.json({
			status: 'success',
			data: user,
		});
	} catch (error) {
		res.json(error);
	}
};

//upload profile photo
const uploadProfilePhotoCtrl = async (req, res, next) => {
	console.log(req.file.path);
	try {
		//1. find the user to be updated
		const userId = req.session.userAuth;
		const userFound = await User.findById(userId);

		//2. check if user is found
		if (!userFound) {
			return next(appErr('User not found', 403));
		}

		//3. update profile photo
		await User.findByIdAndUpdate(
			userId,
			{
				profilePhoto: req.file.path, // Update to match your user model field name
			},
			{
				new: true,
			}
		);

		// Send back the updated user
		const updatedUser = await User.findById(userId);
		res.json({
			status: 'You have successfully updated your profile photo',
			data: updatedUser, // Include the updated user in the response
		});
	} catch (error) {
		next(appErr(error.message));
	}
};

//upload cover photo
const uploadCoverImgCtrl = async (req, res) => {
	try {
		//1. find the user to be updated
		const userId = req.session.userAuth;
		const userFound = await User.findById(userId);

		//2. check if user is found
		if (!userFound) {
			return next(appErr('User not found', 403));
		}

		//3. update profile photo
		await User.findByIdAndUpdate(
			userId,
			{
				coverImage: req.file.path, // Update to match your user model field name
			},
			{
				new: true,
			}
		);

		// Send back the updated user
		const updatedUser = await User.findById(userId);
		res.json({
			status: 'You have successfully updated your cover photo',
			data: updatedUser, // Include the updated user in the response
		});
	} catch (error) {
		next(appErr(error.message));
	}
};

//update password
const updatePasswordCtrl = async (req, res, next) => {
	const {password} = req.body;
	try {
		//check if user is updating password
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const passwordHashed = await bcrypt.hash(password, salt);
			console.log('Password Hashed:', passwordHashed);
			await User.findByIdAndUpdate(
				req.params.id,

				{
					password: passwordHashed,
				},
				{
					new: true,
				}
			);
			console.log('User ID:', req.params.id);
			console.log('New Password:', password);
			console.log('Hashed Password:', passwordHashed);

			res.json({
				status: 'success',
				user: 'Password has been changed successfully',
			});
		}
	} catch (error) {
		return next(appErr('Please provide password field'));
	}
};

//update user
const updateUserCtrl = async (req, res, next) => {
	const {fullname, email} = req.body;
	try {
		//check if email is not taken
		if (email) {
			const emailTaken = await User.findOne({email});
			if (emailTaken) {
				return next(appErr('Email is taken', 400));
			}
		}
		//update the user if email is not taken
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				fullname,
				email,
			},
			{
				new: true,
			}
		);
		res.json({
			status: 'success',
			data: user,
		});
	} catch (error) {
		return res.json(next(appErr(error.message)));
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
