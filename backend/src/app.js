const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const assignmentRoutes = require('./routes/assignments');
const executionRoutes = require('./routes/execution');
const authRoutes = require('./routes/auth');
const attemptRoutes = require('./routes/attempts');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/execute', executionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attempts', attemptRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CipherSQLStudio API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

module.exports = app;
