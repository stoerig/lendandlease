module.exports = function(sequelize, DateTypes) {
	return sequelize.define('user', {
		firstName: {
			type: DateTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DateTypes.STRING,
			allowNull: false
		},

		email: {
			type: DateTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DateTypes.STRING,
			allowNull: false,
			validate: {
				len: [7, 100]
			},		
		},
		dob: {
			type: DateTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DateTypes.STRING,
			allowNull: false
		},
		address: {
			type: DateTypes.STRING,
			allowNull: false
		},
		picture: {
			type: DateTypes.STRING,
			allowNull: false
		}
	});
}