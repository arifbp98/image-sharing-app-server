'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [{
      name: "",
      email: 'example@example.com',
      password: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
