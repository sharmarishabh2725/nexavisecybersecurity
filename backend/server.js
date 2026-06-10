const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Database Schema
const initDb = async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.query(schema);
    console.log('Database schema initialized.');
  } catch (error) {
    console.error('Failed to initialize database (Make sure PostgreSQL is running):', error.message);
  }
};
initDb();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
let stats = { totalVisitors: 1 };
if (fs.existsSync(DATA_FILE)) {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    stats = JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading data.json:', err);
  }
} else {
  fs.writeFileSync(DATA_FILE, JSON.stringify(stats));
}

const saveStats = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(stats));
};

let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  
  socket.on('register_visit', (data) => {
    if (data && data.isNewVisit) {
      stats.totalVisitors++;
      saveStats();
    }
    io.emit('stats_update', {
      activeUsers,
      totalVisitors: stats.totalVisitors
    });
  });

  socket.emit('stats_update', {
    activeUsers,
    totalVisitors: stats.totalVisitors
  });

  socket.on('disconnect', () => {
    activeUsers--;
    io.emit('stats_update', {
      activeUsers,
      totalVisitors: stats.totalVisitors
    });
  });
});

// === REST APIs ===

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO inquiries (first_name, last_name, email, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [firstName, lastName, email, message]
    );
    res.status(201).json({ success: true, inquiryId: result.rows[0].id });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'Failed to save inquiry. Make sure PostgreSQL is running.' });
  }
});

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  try {
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hash]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    
    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create account. Make sure PostgreSQL is running.' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    
    res.json({ success: true, token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login. Make sure PostgreSQL is running.' });
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
