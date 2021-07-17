require('dotenv').config();
const sequelize = require('sequelize');
const env = process.env;


module.exports = new sequelize(env.DB, env.DB_USER, env.DBP_WD, {
	dialect: 'mysql',
	host: 'localhost',
	logging: false
})