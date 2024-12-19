const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL Connection
const pool = new Pool({
  user: "ayushpoudel",
  host: "localhost",
  database: "airline_system",
  password: "your_password", // Replace with your PostgreSQL password
  port: 5432,
});

// Test database connection
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
    const result = await pool.query('SELECT * FROM "member"');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching members:", err.message);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

app.post("/members", async (req, res) => {
  const { memberid, username, name, phonenumber, email, dob, address } =
    req.body;

  // Validate required fields
  if (
    !memberid ||
    !username ||
    !name ||
    !phonenumber ||
    !email ||
    !dob ||
    !address
  ) {
    console.error("Validation failed: All fields are required.");
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO "member" ("memberid", "username", "name", "phonenumber", "email", "dob", "address") 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [memberid, username, name, phonenumber, email, dob, address]
    );
    console.log("Member added successfully:", result.rowCount); // Debug log
    res.status(201).json({ message: "Member added successfully!" });
  } catch (err) {
    console.error("Error adding member:", err.message);
    res
      .status(500)
      .json({ error: "Failed to add member", details: err.message });
  }
});

app.put("/members/:id", async (req, res) => {
  const { id } = req.params;
  const { username, name, phonenumber, email, dob, address } = req.body;

  if (!id) {
    console.error("No ID provided for update.");
    return res.status(400).json({ error: "No ID provided for update." });
  }

  console.log("Received ID for update:", id);
  console.log("Received update data:", req.body);

  try {
    const result = await pool.query(
      `UPDATE "member" SET 
        "username" = $1, 
        "name" = $2, 
        "phonenumber" = $3, 
        "email" = $4, 
        "dob" = $5, 
        "address" = $6 
      WHERE "memberid" = $7`,
      [username, name, phonenumber, email, dob, address, id]
    );

    if (result.rowCount === 0) {
      console.error("No member found with the provided ID:", id);
      return res
        .status(404)
        .json({ error: "No member found with the provided ID." });
    }

    res.json({ message: "Member updated successfully!" });
  } catch (err) {
    console.error("Error updating member:", err.message);
    res.status(500).json({ error: "Failed to update member." });
  }
});

app.delete("/members/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    console.error("Validation failed: No ID provided for deletion.");
    return res.status(400).json({ error: "No ID provided for deletion." });
  }

  try {
    const result = await pool.query(
      'DELETE FROM "member" WHERE "memberid" = $1',
      [id]
    );
    if (result.rowCount === 0) {
      console.error("No member found with the provided ID:", id);
      return res.status(404).json({ error: "Member not found" });
    }
    console.log("Member deleted successfully.");
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    console.error("Error deleting member:", err.message);
    res.status(500).json({ error: "Failed to delete member" });
  }
});

// --- Query and View Data ---
app.get("/views/:viewName", async (req, res) => {
  const { viewName } = req.params;

  const allowedViews = [
    "delayedflightswithcustomers",
    "flightcrewbookingdetails",
    "paymentaggregationbydestination",
    "membercontactinfo",
  ];

  if (!allowedViews.includes(viewName.toLowerCase())) {
    console.error("Validation failed: Invalid view name.");
    return res.status(400).json({ error: "Invalid view name" });
  }

  try {
    const result = await pool.query(`SELECT * FROM "${viewName}"`);
    console.log(`View ${viewName} fetched successfully.`);
    res.json(result.rows);
  } catch (err) {
    console.error(`Error fetching view ${viewName}:`, err.message);
    res.status(500).json({ error: `Failed to fetch view: ${viewName}` });
  }
});

// --- START SERVER ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
