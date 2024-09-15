import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'serviceProvider',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'FJFJd-vd-v24?!',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
  }
);

export default sequelize;
