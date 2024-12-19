const { Pool } = require("pg");

const pool = new Pool({
  user: "ayushpoudel", // Your PostgreSQL username
  host: "localhost", // Hostname
  database: "airline_system", // Your database name
  password: "your_password", // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database!");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;
