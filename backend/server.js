import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Database connection setup
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '8565Kelmendi8565',
  database: 'url_shortener',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect to MySQL
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
    connection.release();
  }
});

// Shortening URL endpoint
app.post('/shorten', (req, res) => {
  const { original_url, expiration_time } = req.body;

  if (!original_url) {
    return res.status(400).json({ error: 'Original URL is required' });
  }
  if (!expiration_time) {
    return res.status(400).json({ error: 'Expiration time is required' });
  }

  const short_code = Math.random().toString(36).substring(2, 8);

  const query = 'INSERT INTO urls (original_url, short_code, expiration_time) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE))';

  db.query(query, [original_url, short_code, expiration_time], (err, result) => {
    if (err) {
      console.error('Error inserting URL into the database:', err);
      return res.status(500).json({ error: 'Failed to shorten URL' });
    }

    res.json({
      original_url,
      shortened_url: `http://localhost:3001/${short_code}`,
      short_code 
    });
  });
});

// Endpoint to redirect short URL to original URL
app.get('/:short_code', (req, res) => {
  const { short_code } = req.params;

  const query = 'SELECT original_url FROM urls WHERE short_code = ? AND (expiration_time IS NULL OR expiration_time > NOW())';

  db.query(query, [short_code], (err, results) => {
    if (err) {
      console.error('Error retrieving URL from the database:', err);
      return res.status(500).json({ error: 'Failed to retrieve URL' });
    }

    if (results.length > 0) {
      res.redirect(results[0].original_url);
    } else {
      res.status(404).json({ error: 'URL not found or expired' });
    }
  });
});

// Endpoint to delete a shortened URL
app.delete('/delete/:short_code', (req, res) => {
  const { short_code } = req.params;

  const query = 'DELETE FROM urls WHERE short_code = ?';

  db.query(query, [short_code], (err, result) => {
    if (err) {
      console.error('Error deleting URL from the database:', err);
      return res.status(500).json({ error: 'Failed to delete URL' });
    }

    if (result.affectedRows > 0) {
      res.json({ message: 'URL deleted successfully' });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
