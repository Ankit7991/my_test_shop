const router = require('express').Router();
const { login } = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const Roles = require('../helpers/roles.helper');
const Authorize = require('../middlewares/auth.middleware');

router.route('/login')
	// POST api/auth/login
	.post(login)






module.exports = router;