'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.TEXT
      },
      source_url: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('currents');
  }
};