require('dotenv').config();
const UserModel = require("../models/user.model");
const httpStatus = require('http-status');
const { comparePasswords, decodeText } = require("../helpers/utils.helper");
const jwt = require('jsonwebtoken');
const Response = require('../helpers/response.helper');


console.log(jwt.sign({
	name: 'test'
}, 'abc'));



const login = async (req, res, next) => {
	try {
		const findUser = await UserModel.findOne({
			where: {
				email: req.body.email
			}
		});
		if (!findUser) throw new TypeError('No user found');

		const comparePassword = comparePasswords(findUser.password, decodeText(req.body.password));
		if (!comparePassword) throw new TypeError('Unauthorized.');

		let tokenData = {
			userID: findUser.userID,
			firstName: findUser.firstName,
			lastName: findUser.lastName,
			email: findUser.email,
			image: findUser.image,
			gender: findUser.gender,
		};

		let jwtToken = jwt.sign(tokenData, process.env.SECRET, {
			expiresIn: 1440
		}, { algorithm: 'RS256' });
		console.log(jwtToken);

		delete findUser.password;
		const data = new Response({
			userData: findUser,
			token: jwtToken
		}, httpStatus.OK);

		res.status(data.status).json(data);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message
		});
	}
};


module.exports = {
	login
};