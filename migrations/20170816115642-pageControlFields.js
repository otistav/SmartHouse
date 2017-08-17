'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('pageControls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      controlID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'controls',
          key: 'id'
        }
      },
      pageID: {
        type: Sequelize.INTEGER,
        references: {
          model:'pages',
          key: 'id'
        }
      },
      height: {
        type: Sequelize.INTEGER,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      position_x: {
        type: Sequelize.INTEGER,
      },
      position_y: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('pageControls');
  }
};
