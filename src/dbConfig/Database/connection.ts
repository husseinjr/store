import { Sequelize } from 'sequelize';
import config from '../../middleware/config';
import dbconfig from '../config.database';

type Environment = 'development' | 'production';

const env: Environment = (config.nodeEnv as Environment) || 'development';

const requirements = dbconfig[env];

const sequelize = new Sequelize(
  requirements.dbName,
  requirements.dbUserName,
  requirements.dbPassword,
  {
    host: requirements.dbHost,
    dialect: 'postgres',
    pool: {
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
