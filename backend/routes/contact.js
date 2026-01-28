import express from "express";
import { body, validationResult } from "express-validator";
import pool from "../config/database.js";

const router = express.Router();

// Validation middleware
const validateContactForm = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),

  body("company")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Company name cannot exceed 200 characters"),

  body("budget")
    .optional()
    .isIn(["5k-10k", "10k-25k", "25k-50k", "50k+"])
    .withMessage("Invalid budget range"),

  body("message")
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Message must be between 10 and 5000 characters"),
];

// POST /api/contact - Submit contact form
router.post("/", validateContactForm, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, company, budget, message } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("user-agent");

    console.log("📨 Processing contact form:", { name, email, company });

    // Insert into database
    const query = `
      INSERT INTO contact_messages (name, email, company, budget, message, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at
    `;

    const result = await pool.query(query, [
      name,
      email,
      company || null,
      budget || null,
      message,
      ipAddress,
      userAgent,
    ]);

    const messageId = result.rows[0].id;
    console.log("✅ Contact message saved with ID:", messageId);

    res.status(201).json({
      success: true,
      message:
        "Thank you for your message! We'll get back to you within 24 hours.",
      submissionId: messageId,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// GET /api/contact/stats - Get submission statistics (public)
router.get("/stats", async (req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(*) as total_submissions,
        COUNT(DISTINCT email) as unique_submissions,
        COUNT(CASE WHEN budget IS NOT NULL THEN 1 END) as with_budget,
        MIN(created_at) as first_submission,
        MAX(created_at) as latest_submission
      FROM contact_messages
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `;

    const result = await pool.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export default router;
