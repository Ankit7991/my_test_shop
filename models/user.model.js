const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const ProductModel = require('./product.model');


const UserModel = sequelize.define('user', {
	userID: {
		primaryKey: true,
		type: Sequelize.INTEGER,
		autoIncrement: true
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	image: {
		type: Sequelize.STRING,
		allowNull: true
	},
	gender: {
		type: Sequelize.STRING,
		allowNull: true
	}
}, {alter: true});


UserModel.hasMany(ProductModel, {
	foreignKey: 'userID',
	sourceKey: 'userID'
});
ProductModel.belongsTo(UserModel, {
	foreignKey: 'userID',
	targetKey: 'userID'
});

module.exports = UserModel;