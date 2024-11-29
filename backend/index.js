const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL Connection
const pool = new Pool({
  user: "ayushpoudel", // Replace with your PostgreSQL username
  host: "localhost",
  database: "airline_system",
  password: "your_password", // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

pool
  .connect()
  .then(() => console.log("Connected to the PostgreSQL database!"))
  .catch((err) => console.error("Database connection error:", err));

// --- ROUTES ---

// Test Endpoint
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// --- CRUD Operations for Members ---
app.get("/members", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Member");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

app.post("/members", async (req, res) => {
  const { memberid, username, name, phonenumber, email, dob, address } =
    req.body;
  try {
    await pool.query(
      "INSERT INTO Member (MemberID, Username, Name, PhoneNumber, Email, DoB, Address) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [memberid, username, name, phonenumber, email, dob, address]
    );
    res.status(201).json({ message: "Member added successfully!" });
  } catch (err) {
    console.error("Error adding member:", err);
    res.status(500).json({ error: "Failed to add member" });
  }
});

app.delete("/members/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Member WHERE MemberID = $1", [id]);
    res.json({ message: "Member deleted successfully!" });
  } catch (err) {
    console.error("Error deleting member:", err);
    res.status(500).json({ error: "Failed to delete member" });
  }
});

// --- Query and View Data ---
app.get("/views/:viewName", async (req, res) => {
  const { viewName } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM ${viewName}`);
    res.json(result.rows);
  } catch (err) {
    console.error(`Error fetching view ${viewName}:`, err);
    res.status(500).json({ error: `Failed to fetch view: ${viewName}` });
  }
});

// --- Example Query Endpoint ---
app.get("/query", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        Member.Name AS "Member Name", 
        Reservation.PNRNumber AS "PNR", 
        Flight.FlightNumber AS "Flight Number", 
        Flight.Status AS "Flight Status"
      FROM Member
      INNER JOIN Reservation ON Member.MemberID = Reservation.MemberID
      INNER JOIN Flight ON Reservation.FlightNumber = Flight.FlightNumber
      WHERE Flight.Status = 'Delayed';
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error running query:", err);
    res.status(500).json({ error: "Failed to run query" });
  }
});

// --- START SERVER ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
