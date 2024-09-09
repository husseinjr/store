"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE_NAME } = process.env;
console.log(process.env);
exports.default = {
    port: Number(PORT),
    dbUserName: String(DB_USER),
    dbPassword: String(DB_PASSWORD),
    dbHost: String(DB_HOST),
    dbPort: Number(DB_PORT),
    dbName: String(DB_DATABASE_NAME)
};
