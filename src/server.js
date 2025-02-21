import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';

let server;

async function main() {
  try {
    await mongoose.connect(config.database_url);
    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}

main();

// 🔹 Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection is detected, shutting down...', err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// 🔹 Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception is detected, shutting down...', err);
  process.exit(1);
});
