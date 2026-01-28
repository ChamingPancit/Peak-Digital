import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key",
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// GET /api/admin/messages - Get all contact messages
router.get("/messages", verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || null; // 'read', 'unread', 'replied'

    let query = "SELECT * FROM contact_messages";
    let countQuery = "SELECT COUNT(*) FROM contact_messages";
    const params = [];

    if (status) {
      query += " WHERE status = $1";
      countQuery += " WHERE status = $1";
      params.push(status);
    }

    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    query +=
      " ORDER BY created_at DESC LIMIT $" +
      (params.length + 1) +
      " OFFSET $" +
      (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.json({
      messages: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Messages fetch error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// GET /api/admin/messages/:id - Get single message
router.get("/messages/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM contact_messages WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Mark as read
    await pool.query(
      "UPDATE contact_messages SET status = $1, viewed_at = NOW() WHERE id = $2",
      ["read", id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Message fetch error:", error);
    res.status(500).json({ error: "Failed to fetch message" });
  }
});

// PUT /api/admin/messages/:id - Update message status
router.put("/messages/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!["unread", "read", "replied", "archived"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const query = `
      UPDATE contact_messages 
      SET status = $1, notes = COALESCE($2, notes), updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(query, [status, notes || null, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update message" });
  }
});

// DELETE /api/admin/messages/:id - Delete message
router.delete("/messages/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM contact_messages WHERE id = $1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// GET /api/admin/dashboard - Dashboard stats
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_messages,
        COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread_count,
        COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_count,
        COUNT(DISTINCT email) as unique_senders,
        AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_response_time
      FROM contact_messages
    `;

    const budgetQuery = `
      SELECT budget, COUNT(*) as count
      FROM contact_messages
      WHERE budget IS NOT NULL
      GROUP BY budget
      ORDER BY count DESC
    `;

    const recentQuery = `
      SELECT id, name, email, created_at, status
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT 5
    `;

    const [stats, budgets, recent] = await Promise.all([
      pool.query(statsQuery),
      pool.query(budgetQuery),
      pool.query(recentQuery),
    ]);

    res.json({
      stats: stats.rows[0],
      budgetDistribution: budgets.rows,
      recentSubmissions: recent.rows,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
