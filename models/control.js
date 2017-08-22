'use strict';
module.exports = function(sequelize, DataTypes) {
  var control = sequelize.define('control', {
    name: DataTypes.STRING,
    typeUUID: DataTypes.UUID,
    propFunction: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        console.log("THIS IS ASSOCIATION");
        control.hasMany(models.pageControl, {as: 'pageControl', foreignKey: "controlID"})
      }
    }
  });
  control.associate = function(models) {
    // associations can be defined here
    console.log("THIS IS ASSOCIATION");
    control.hasMany(models.pageControl, {as: 'pageControl', foreignKey: "controlID"})
  };
  return control;
};