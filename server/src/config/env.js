import dotenv from 'dotenv';
dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quatrea',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  accessSecret: process.env.JWT_ACCESS_SECRET || 'dev_access_secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret',
  accessExpires: process.env.ACCESS_EXPIRES || '15m',
  refreshExpires: process.env.REFRESH_EXPIRES || '7d',
};
env.isProd = env.nodeEnv === 'production';
export default env;
