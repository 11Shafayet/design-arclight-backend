import cors from 'cors';
import express from 'express';
import timeout from 'connect-timeout';
import routes from './app/routes/index.js';
import notFound from './app/middlewares/notFound.js';

const app = express();

// 1️⃣ Global Middleware
app.use(timeout('600s')); // Set request timeout
app.use(express.json());

// 2️⃣ CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://designarclight.com'],
    credentials: true,
  })
);

// 3️⃣ API Routes
app.use('/api', routes);

// 4️⃣ Not Found Handler
app.use(notFound);

// 5️⃣ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
});

export default app;
