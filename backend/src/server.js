const express = require('express');
const path = require('path');
const cors = require('cors');
const documentsRouter = require('./routes/documents');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/documents', documentsRouter);

// Default error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
