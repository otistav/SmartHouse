'use strict';
module.exports = function(sequelize, DataTypes) {
  var pageControl = sequelize.define('pageControl', {
    pageID: DataTypes.INTEGER,
    controlID: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    position_x: DataTypes.INTEGER,
    position_y: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pageControl;
};

// 'use strict';
// module.exports = {
//   up: function(queryInterface, Sequelize) {
//     return queryInterface.createTable('pageControls', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       controlID: {
//         type: Sequelize.UUID,
//         references: {
//           model: 'controls',
//           key: 'uuid'
//         }
//       },
//       pageID: {
//         type: Sequelize.INTEGER,
//         references: {
//           model:'pages',
//           key: 'id'
//         }
//       },
//       height: {
//         type: Sequelize.INTEGER,
//       },
//       weight: {
//         type: Sequelize.INTEGER,
//       },
//       position_x: {
//         type: Sequelize.INTEGER,
//       },
//       position_y: {
//         type: Sequelize.INTEGER,
//       },
//
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: function(queryInterface, Sequelize) {
//     return queryInterface.dropTable('pageControls');
//   }
// };
