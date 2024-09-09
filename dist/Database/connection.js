"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('testing', 'postgres', 'test123456', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        // Pool configuration can be added here
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.log('Erro in connecting to database : ', err);
});
exports.default = sequelize;
