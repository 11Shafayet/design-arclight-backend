import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';

let isConnected = false; // Track connection status

async function connectDB() {
  if (!isConnected) {
    try {
      await mongoose.connect(config.database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log('MongoDB Connected!');
    } catch (error) {
      console.error('MongoDB Connection Failed', error);
      throw error;
    }
  }
}

export default async function handler(req, res) {
  try {
    await connectDB(); // Only connect once
    app(req, res); // Pass request to Express app
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
