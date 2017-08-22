'use strict';
module.exports = function(sequelize, DataTypes) {
  var rule = sequelize.define('rule', {
    sourceID: DataTypes.INTEGER,
    sourceType: DataTypes.STRING,
    event: DataTypes.STRING,
    func: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return rule;
};