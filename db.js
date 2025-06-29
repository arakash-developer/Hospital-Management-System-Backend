const { Pool } = require("pg");
require("dotenv").config();

console.log("Connecting to DB with the following config:");
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS ? '********' : 'NOT SET',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL || false,
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  ssl: process.env.DB_SSL === 'true',
});

// Optional test connection immediately
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ DB Connection Error:", err.message);
  } else {
    console.log("✅ PostgreSQL Connected Successfully");
    release();
  }
});

module.exports = pool;
