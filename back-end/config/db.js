const Sequelize = require('sequelize');

const db = new Sequelize('article', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	operatorAliases: false,
	pool: {
		max: 5,
		min:0,
		acquire: 30000,
		idle: 1000
	},
	timezone: '+07:00'
})

module.exports = db