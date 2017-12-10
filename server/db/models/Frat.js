const db = require('../index.js');
const Sequelize = require('sequelize');

const Frat = db.define('frat', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: 'https://vignette.wikia.nocookie.net/terraforming/images/3/36/Earth.jpg/revision/latest?cb=20151012095444'
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
})

module.exports = Frat;