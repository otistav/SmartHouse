'use strict';
module.exports = function(sequelize, DataTypes) {
  var deviceType = sequelize.define('deviceType', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return deviceType;
};

// 'use strict';
// module.exports = {
//   up: function(queryInterface, Sequelize) {
//     return queryInterface.createTable('devices', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       name: {
//         type: Sequelize.STRING,
//         unique: true
//
//       },
//       typeUUID: {
//         type: Sequelize.UUID,
//         references: {
//           model: 'deviceTypes',
//           key: 'uuid'
//         }
//       },
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
//     return queryInterface.dropTable('devices');
//   }
// };