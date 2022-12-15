'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [
            {
                nameRole:"admin",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameRole:"employee",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameRole:"customer",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
