const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL Pool
const pool = new Pool({
    user: 'ayushpoudel',
    host: 'localhost',
    database: 'airline_system',
    password: 'your_password', // Replace with your actual password
    port: 5432,
});

// Routes
app.get('/api/members', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Member;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/members', async (req, res) => {
    const { memberid, username, name, phonenumber, email, dob, address } = req.body;
    try {
        await pool.query(
            'INSERT INTO Member (MemberID, Username, Name, PhoneNumber, Email, DoB, Address) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [memberid, username, name, phonenumber, email, dob, address]
        );
        res.status(201).send('Member added successfully!');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

