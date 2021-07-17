const router = require('express').Router();
const user = require('./user.route');
const auth = require('./auth.route');
const product = require('./product.route');




router.use('/user', user);
router.use('/auth', auth);
router.use('/product', product);




module.exports = router;