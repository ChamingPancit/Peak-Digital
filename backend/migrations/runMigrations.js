import pool from "../config/database.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const migrations = [
  // Create contact messages table
  `
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(254) NOT NULL,
      company VARCHAR(200),
      budget VARCHAR(50),
      message TEXT NOT NULL,
      ip_address VARCHAR(45),
      user_agent TEXT,
      status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      viewed_at TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // Create admin users table
  `
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(254) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    )
  `,

  // Create indices
  `
    CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_messages(email)
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC)
  `,
  `
    CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status)
  `,
];

async function runMigrations() {
  const client = await pool.connect();

  try {
    console.log("🔄 Running migrations...");

    for (let i = 0; i < migrations.length; i++) {
      try {
        await client.query(migrations[i]);
        console.log(`✅ Migration ${i + 1} completed`);
      } catch (error) {
        // Table might already exist, continue
        console.log(`⏭️  Migration ${i + 1} skipped (table may already exist)`);
      }
    }

    // Create default admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "secure_admin_password";

    try {
      const result = await client.query(
        "SELECT id FROM admin_users WHERE email = $1",
        [adminEmail],
      );

      if (result.rows.length === 0) {
        const passwordHash = await bcrypt.hash(adminPassword, 10);
        await client.query(
          "INSERT INTO admin_users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4)",
          [adminEmail, passwordHash, "Admin", "User"],
        );
        console.log(`✅ Default admin user created: ${adminEmail}`);
      } else {
        console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
      }
    } catch (error) {
      console.log(`⏭️  Admin user creation skipped:`, error.message);
    }

    console.log("✅ All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

runMigrations();
