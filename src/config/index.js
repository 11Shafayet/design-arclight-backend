import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  email_host: process.env.EMAIL_HOST || 'mail.designarclight.com',
  email_port: process.env.EMAIL_PORT || '465',
  email_user: process.env.EMAIL_USER || 'contact@designarclight.com',
  email_pass: process.env.EMAIL_PASS || 'Farzana111@!',
  app_pass: process.env.APP_PASS || 'Farzana111@!',
};

export default config;
