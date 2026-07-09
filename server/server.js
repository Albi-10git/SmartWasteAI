const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Sessions
app.use(session({
    secret: 'smartwasteai-session-key-secret-12345',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Initialize tables
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table ready.');
            }
        });
    }
});

/* ==========================================================================
   AUTHENTICATION ENDPOINTS
   ========================================================================== */

// 1. Sign Up
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedUsername.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Check if user already exists
    db.get('SELECT id FROM users WHERE username = ? OR email = ?', [trimmedUsername, trimmedEmail], (err, row) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (row) {
            return res.status(400).json({ error: 'Username or email already registered.' });
        }

        db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [trimmedUsername, trimmedEmail, password],
            function (err) {
                if (err) {
                    console.error('Database insert error:', err.message);
                    return res.status(500).json({ error: 'Internal server error.' });
                }

                // Log the user in automatically after signup
                const userSession = {
                    id: this.lastID,
                    username: trimmedUsername,
                    email: trimmedEmail
                };
                req.session.user = userSession;

                return res.status(201).json({
                    success: true,
                    message: 'Account created successfully.',
                    user: userSession
                });
            }
        );
    });
});

// 2. Login
app.post('/api/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const identifier = usernameOrEmail.trim();

    // Query user by username or email
    db.get(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [identifier, identifier.toLowerCase()],
        (err, user) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            if (!user) {
                return res.status(400).json({ error: 'Invalid username/email or password.' });
            }

            // Compare plaintext password
            if (user.password !== password) {
                return res.status(400).json({ error: 'Invalid username/email or password.' });
            }

            // Set session
            const userSession = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            req.session.user = userSession;

            return res.status(200).json({
                success: true,
                message: 'Logged in successfully.',
                user: userSession
            });
        }
    );
});

// 3. Get Authenticated User Info
app.get('/api/me', (req, res) => {
    if (req.session.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    } else {
        return res.json({ loggedIn: false });
    }
});

// 4. Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err.message);
            return res.status(500).json({ error: 'Failed to log out.' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ success: true, message: 'Logged out successfully.' });
    });
});

// Serve public static files
app.use(express.static(path.join(__dirname, '../public')));

// Fallback to index.html for root page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
