import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || 'very-secret',
    expires_in: process.env.JWT_EXPIRES_IN || '1d',
  },
};

export default config;
