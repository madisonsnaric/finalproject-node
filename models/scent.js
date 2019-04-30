const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('scent', {
  id: {
    field: 'ScentId',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  scent: {
    field: 'Scent',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Scent is required'
      },
      isAlpha: {
        args: true,
        msg: 'Scent must only contain letters'
      },
      len: {
        args: [3, 20],
        msg: 'Scent must be between 3 and 20 characters'
      }
    }
  }
}, {
  timestamps: false
});
