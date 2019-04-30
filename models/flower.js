const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('flower', {
  id: {
    field: 'FlowerId',
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    field: 'Name',
    type: Sequelize.STRING,
    validate: {
      isAlpha: {
        args: true,
        msg: 'Name must only contain letters'
      }
    }
  },
  scientificname: {
    field: 'ScientificName',
    type: Sequelize.STRING
  },
  bloomingperiodid: {
    field: 'BloomingPeriodId',
    type: Sequelize.INTEGER
  },
  scentid: {
    field: 'ScentId',
    type: Sequelize.INTEGER
  },
  planting: {
    field: 'Planting',
    type: Sequelize.STRING
  },
  care: {
    field: 'Care',
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});
