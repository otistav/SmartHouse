'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('icons',[{
      id: 1,
      path: 'address-book',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        id: 2,
        path: 'bank',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        path: 'bars',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        path: 'bath',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        path: 'bell-o',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        path: 'circle',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        path: 'coffee',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        path: 'cube',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
