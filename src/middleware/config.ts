import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV } = process.env;

export default {
  port: Number(PORT),
  nodeEnv: String(NODE_ENV),
};
