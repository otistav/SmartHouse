'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      queryInterface.createTable(
          'users',
          {
              id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
              },
              login: {
                  type:Sequelize.STRING,
                  unique: true
              },
              firstName: Sequelize.STRING,
              lastName: Sequelize.STRING,
              password: Sequelize.STRING,
              isAdmin: Sequelize.BOOLEAN,
              createdAt: {
                  type: Sequelize.DATE
              },
              updatedAt: {
                  type: Sequelize.DATE
              },
          })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
