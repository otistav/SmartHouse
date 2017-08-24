'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('controlTypes',[{
      uuid: 'A0EAAC99-9C0B-4FF8-BB6D-6BB9BD380C41',
      name: 'Info Control',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
