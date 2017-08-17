'use strict';
module.exports = function(sequelize, DataTypes) {
  var page = sequelize.define('page', {
    name: {
        type:DataTypes.STRING,
        unique: true
    },
    caption: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    position_x: DataTypes.INTEGER,
    position_y: DataTypes.INTEGER,
    iconID: DataTypes.INTEGER,

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  // page.associate = function(models) {
  //   // associations can be defined here
  //   console.log("THIS IS ASSOCIATION");
  //   page.(models.icon, {as: 'icons'})
  // };
  return page;
};