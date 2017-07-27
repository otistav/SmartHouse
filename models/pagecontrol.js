'use strict';
module.exports = function(sequelize, DataTypes) {
  var pageControl = sequelize.define('pageControl', {
    controlID: DataTypes.INTEGER,
    pageID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pageControl;
};