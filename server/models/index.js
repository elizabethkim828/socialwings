var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/socialwings', {
	logging: false
});

var User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
    getterMethods: {
		route: function () {
			return '/users/' + this.dataValues.id;
		}
	},
	classMethods: {
		findByUsername: function(username) {
			return this.findOne({
				where: {
	        		username: username
	            }
	        });
	    },
	},
});

var Event = db.define('event', {
	title: {
		type: Sequelize.STRING
	},
	urlTitle: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.TEXT
	},
	date: {
		type: Sequelize.DATEONLY,
		defaultValue: Sequelize.NOW
	},
	tags: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	status: {
		type: Sequelize.ENUM('open', 'closed'),
		defaultValue: 'open'
	}
}, {
	hooks: { // this auto updates urlTitle if the title changess
		beforeValidate: function(page, options) {
			page.urlTitle = page.title.trim().replace(/\s+/g, "_").replace(/\W/g, "")
		}
    },
    getterMethods: {
		route: function() {
			//return '/events/' + this.urlTitle + '/' + this.userId;
		}
	},
	classMethods: {
		findByTags: function(tagArray) {
			return this.findAll({
				where: {
	        		tags: {
	            		$overlap: tagArray
	            	}
	            }
	        });
	    },
	},
	instanceMethods: {
		findSimilar: function() {
			return Page.findAll({
				where: {
					tags: {
						$overlap: this.tags,
					},
					id: {
			            $ne: this.id
			        },
				}
			})
		}
	}
});

Event.belongsTo(User);

module.exports = {
	User: User,
	Event: Event,
	db: db
}

