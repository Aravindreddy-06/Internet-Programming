// server.js
// Simple Express server demonstrating:
// - Serving static HTML (index.html)
// - Handling secure form submission via POST
// - Communicating over HTTP (the correct web protocol)

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data (from POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (index.html, video.mp4, config.xml, etc.)
app.use(express.static(path.join(__dirname)));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Registration route - only accepts POST (secure form submission)
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // In a real app: hash the password, validate input, save to a database, etc.
  console.log('New registration received:');
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password: [hidden for security]');

  res.status(200).json({
    message: `Registration successful! Welcome, ${username}.`
  });
});

// Reject GET requests to /register to demonstrate correct method usage
app.get('/register', (req, res) => {
  res.status(405).send('Method Not Allowed. Please use POST to register.');
});

app.listen(PORT, () => {
  console.log(`Server running over HTTP at http://localhost:${PORT}`);
});