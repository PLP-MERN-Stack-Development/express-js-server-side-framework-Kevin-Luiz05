// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); // per assignment requirement
const { v4: uuidv4 } = require('uuid');
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const { NotFoundError } = require('./errors/customErrors');

const app = express();
const PORT = process.env.PORT || 3000;

// global middlewares
app.use(logger);                  // custom logger middleware
app.use(bodyParser.json());       // parse JSON (assignment requested body-parser)
app.use(auth);                    // authentication middleware (API key)

// routes
app.use('/api/products', productsRouter);

// root hello
app.get('/', (req, res) => res.send('Hello — Products API running'));

// 404 handler for unknown routes
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// global error handler (last middleware)
app.use((err, req, res, next) => {
  // err should follow our custom error shape
  const status = err.status || 500;
  const payload = {
    error: err.message || 'Internal Server Error'
  };
  if (process.env.NODE_ENV !== 'production' && err.stack) payload.stack = err.stack;
  res.status(status).json(payload);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
