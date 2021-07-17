require('dotenv').config();
const expressjwt = require('express-jwt');

const Authorize = (Roles) => {
	return [
		expressjwt({
			secret: process.env.SECRET, algorithms: [ 'sha1', 'RS256', 'HS256' ] }),
		// expressjwt({secret: process.env.SECRET}),
		(req, res, next) => {
			if (!Roles.some(role => req.user[role])) throw new TypeError('Unauthorized');
			next();
		}
	];
};

module.exports = Authorize;