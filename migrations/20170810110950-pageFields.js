'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iconID: {
        type: Sequelize.INTEGER,
        references: {
          model:'icons',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      caption: Sequelize.STRING,
      width: Sequelize.INTEGER,
      height: Sequelize.INTEGER,
      position_x: Sequelize.INTEGER,
      position_y: Sequelize.INTEGER,
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

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};