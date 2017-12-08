const db = require('../index.js');
const Sequelize = require('sequelize');

const Student = db.define('student', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull:false,
		validate: {
			isEmail: true
		}
	},
	gpa: {
		type: Sequelize.FLOAT,
		validate: {
			min: 0.0,
			max: 4.0
		}
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/3602.png&w=350&h=254'
	}
	}, 
	{
		getterMethods: {
			name() {
				return this.firstName + ' ' + this.lastName;
			}
		}
	}
)

module.exports = Student;