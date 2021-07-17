const router = require('express').Router();
const userController = require('../controllers/user.controller');
const Roles = require('../helpers/roles.helper');
const Authorize = require('../middlewares/auth.middleware');

router.route('/')
	// POST api/user
	.post(userController.registerUser)







module.exports = router;