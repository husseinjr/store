"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../middleware/config"));
const config_database_1 = __importDefault(require("../config.database"));
const env = config_1.default.nodeEnv || 'development';
const requirements = config_database_1.default[env];
const sequelize = new sequelize_1.Sequelize(requirements.dbName, requirements.dbUserName, requirements.dbPassword, {
    host: requirements.dbHost,
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
