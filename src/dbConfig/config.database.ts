import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE_NAME } =
  process.env;

export default {
  development: {
    dbUserName: String(DB_USER),
    dbPassword: String(DB_PASSWORD),
    dbHost: String(DB_HOST),
    dbPort: Number(DB_PORT),
    dbName: String(DB_DATABASE_NAME),
  },
  production: {
    dbUserName: String(DB_USER),
    dbPassword: String(DB_PASSWORD),
    dbHost: String(DB_HOST),
    dbPort: Number(DB_PORT),
    dbName: String(DB_DATABASE_NAME),
    logging: false,
  },
};
