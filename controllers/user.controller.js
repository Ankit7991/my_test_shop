const { encryptPassword, comparePasswords, encodeText, decodeText } = require("../helpers/utils.helper");
const Response = require('../helpers/response.helper');
const UserModel = require("../models/user.model");
const httpStatus = require("http-status");
const { User } = require("../helpers/roles.helper");



const registerUser = async (req, res, next) => {
	try {
		const findDuplicate = await UserModel.findOne({
			where: {
				email: req.body.email
			}
		});

		if(findDuplicate) throw new TypeError('Duplicate email');

		const createUser = await UserModel.create({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			image: req.body.image,
			gender: req.body.gender,
			password: encryptPassword(decodeText(req.body.password))
		});

		if(!createUser) throw new TypeError('Failed to create user');

		const data = new Response(createUser, httpStatus.OK);
		res.status(data.status).json(data);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message
		})
	}
};



module.exports = {
	registerUser
};
