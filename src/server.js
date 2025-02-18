import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';

let isConnected = false; // Track database connection status

export default async function handler(req, res) {
  try {
    // Connect to MongoDB if not already connected
    if (!isConnected) {
      await mongoose.connect(config.database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
    }

    // Use Express app to handle requests
    app(req, res);
  } catch (err) {
    console.error('Serverless function error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
