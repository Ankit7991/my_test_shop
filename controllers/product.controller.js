require('dotenv').config();
const httpStatus = require('http-status');
const Response = require('../helpers/response.helper');
const ProductModel = require('../models/product.model');

const addProduct = async (req, res, next) => {
	try {

		const createProduct = await ProductModel.create({
			name: req.body.name,
			image: req.body.image,
			price: req.body.price,
			sku: req.body.sku || null,
			userID: req.user.userID || null
		});

		if (!createProduct) throw new TypeError('Failed to add product');

		const data = new Response(createProduct, httpStatus.OK);

		res.status(data.status).json(data);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message
		});
	}
};


const updateProduct = async (req, res, next) => {
	try {
		
		const where = {
			userID: req.user.userID,
			productID: req.params.id
		};
		const updateDetails = await ProductModel.update({
			name: req.body.name,
			image: req.body.image,
			price: req.body.price,
			sku: req.body.sku || null,
		}, { where });

		if (!updateDetails[0]) throw new TypeError('Failed to update product');

		const updatedProduct = await ProductModel.findOne({ where })

		const data = new Response(updatedProduct, httpStatus.OK);

		res.status(data.status).json(data);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message
		});
	}
};


const getProducts = async (req, res, next) => {
	try {
		const createProduct = await ProductModel.findAll({
			where: {
				userID: req.user.userID
			}
		});

		if (!createProduct) throw new TypeError('Failed to add product');

		const data = new Response(createProduct, httpStatus.OK);
		res.status(data.status).json(data);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message
		});
	}
};


const deleteProduct = async (req, res, next) => {
	try {

		const where = {
			productID: req.params.id,
			...req.user.userID ? {userID: req.user.userID} : {}
		};
		const deleteProduct = await ProductModel.destroy({ where });

		if (!deleteProduct) throw new TypeError('Failed to delete product');

		const updatedProduct = await ProductModel.findOne({ where })

		const data = new Response({message: 'Product deleted successfully.'}, httpStatus.OK);

		res.status(data.status).json(data);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message
		});
	}
};


module.exports = {
	addProduct,
	updateProduct,
	getProducts,
	deleteProduct
};