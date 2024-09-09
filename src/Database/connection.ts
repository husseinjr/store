import { Sequelize } from 'sequelize';
import config from '../middleware/config';


const sequelize = new Sequelize(
  config.dbName,
  config.dbUserName,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'postgres',
    pool: {
      // Pool configuration can be added here
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Erro in connecting to database : ', err);
  });

export default sequelize;
