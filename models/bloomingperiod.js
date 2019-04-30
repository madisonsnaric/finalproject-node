const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('bloomingperiod', {
  id: {
    field: 'BloomingPeriodId',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bloomingperiod: {
    field: 'BloomingPeriod',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Blooming period is required'
      },
      isAlpha: {
        args: true,
        msg: 'Blooming period must only contain letters'
      },
      len: {
        args: [3, 30],
        msg: 'Blooming period must be between 3 and 30 characters'
      }
    }
  }
}, {
  timestamps: false
});
