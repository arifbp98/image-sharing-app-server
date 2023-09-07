'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Image', [{
      img: "",
      title: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Image', null, {});
  }
};
