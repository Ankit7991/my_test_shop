const sequelize = require('../config/database');
const Sequelize = require('sequelize');


const ProductModel = sequelize.define('productID', {
	productID: {
		primaryKey: true,
		type: Sequelize.INTEGER,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.STRING,
		allowNull: false
	},
	sku: {
		type: Sequelize.STRING,
		allowNull: true
	},
	image: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	userID: {
		type: Sequelize.INTEGER,
		allowNull: true
	}
}, {alter: true})


module.exports = ProductModel;