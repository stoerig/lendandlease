var Sequelize = require('sequelize');
var sequelize;

var sequelize = new Sequelize('lendborrow', 'root', 'password123', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

var sequelize = new Sequelize('mysql://root:password123@localhost:3306/lendborrow');


var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;