const { addProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/product.controller');
const Roles = require('../helpers/roles.helper');
const Authorize = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.route('/')
	// POST api/product
	.post(Authorize([ Roles.User ]), addProduct)
	// GET api/product
	.get(Authorize([ Roles.User ]), getProducts)


router.route('/:id')
	// delete api/product/:id
	.delete(Authorize([ Roles.User ]), deleteProduct)
	// PATCH api/product/:id
	.patch(Authorize([ Roles.User ]), updateProduct)






module.exports = router;