import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

/**
 * POST /api/seed
 * Seeds the initial admin user. Protected by ADMIN_SECRET_KEY.
 *
 * Usage: POST /api/seed with body { "secretKey": "<ADMIN_SECRET_KEY>" }
 *
 * Default admin credentials after seeding:
 *   Email: admin@atmonnati.com
 *   Password: admin123
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secretKey } = body;

    // Verify secret key
    if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid secret key" },
        { status: 401 }
      );
    }

    await connectDB();

    const email = "admin@atmonnati.com";
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 12);

    // Upsert admin
    const existing = await Admin.findOne({ email });
    if (existing) {
      existing.password = hashedPassword;
      await existing.save();
      return NextResponse.json({
        message: "Admin password reset successfully",
        email,
        note: "Password: admin123 — change immediately after login",
      });
    }

    await Admin.create({ email, password: hashedPassword });

    return NextResponse.json(
      {
        message: "Admin seeded successfully",
        email,
        note: "Password: admin123 — change immediately after login",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Seed error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
