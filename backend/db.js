import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: '8565Kelmendi8565', 
  database: 'url_shortener',
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
    connection.release();
  }
});

export default db;

