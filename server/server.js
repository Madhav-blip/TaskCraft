// main server file - run with: node server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// cors so only our frontend can call the api
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// routes (no /api prefix, the srs says to keep them clean)
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// error handler has to be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log('TaskCraft server listening on port ' + PORT));
});
