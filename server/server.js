require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const connectDatabase = require('./database/mongodb');
const complaintRoutes = require('./routes/complaintRoutes');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'smartwasteai-development-secret', resave: false, saveUninitialized: false, cookie: { secure: false, maxAge: 86400000 } }));
app.use('/api/complaints', complaintRoutes);
app.use('/api', authRoutes);
app.use('/api/files', fileRoutes);

app.use((error, req, res, next) => {
  if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid complaint id.' });
  if (error.name === 'ValidationError') return res.status(400).json({ message: Object.values(error.errors).map((item) => item.message).join(' ') });
  console.error(error);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

connectDatabase()
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((error) => { console.error(`Database connection failed: ${error.message}`); process.exit(1); });
