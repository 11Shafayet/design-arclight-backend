import cors from 'cors';
import express from 'express';
import routes from './app/routes/index.js';
import notFound from './app/middlewares/notFound.js';

const app = express();

// Parsers
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin); // Dynamically allow origins
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Not Found
app.use(notFound);

export default app;
