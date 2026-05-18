/**
 * Admin Seed Script
 *
 * Run this script to create the initial admin user:
 *   node scripts/seed-admin.mjs
 *
 * Default credentials:
 *   Email: tbhangale9@gmail.com
 *   Password: Tejas@2005
 *
 * Change the password immediately after first login in production.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("MONGODB_URL not found in environment variables");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URL, { dbName: "registration_platform" });
    console.log("Connected to MongoDB");

    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

    const email = "sample";
    const password = "sample";

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log(`Admin already exists: ${email}`);
      console.log("Updating password...");
      existing.password = await bcrypt.hash(password, 12);
      await existing.save();
      console.log("Password updated successfully");
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      await Admin.create({ email, password: hashedPassword });
      console.log(`Admin created successfully!`);
    }

    console.log(`\n  Email:    ${email}`);
    console.log(`  Password: ${password}`);
    console.log(`\n  Change the password after first login.\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
