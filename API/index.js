const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/users', async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [name, email, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE user_id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, phone = $3 WHERE user_id = $4 RETURNING *',
            [name, email, phone, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE user_id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/organizers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM organizers');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/venues', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM venues');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bookings');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/tickets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickets');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/payments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payments');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/feedback', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM feedback');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/sponsors', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sponsors');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/event_sponsors', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM event_sponsors');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
        console.log(`Server is running on PORT : ${PORT}`);
        });