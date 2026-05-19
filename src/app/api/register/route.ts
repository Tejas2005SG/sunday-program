import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { validateRegister } from "@/lib/validation";
import { getRateLimitKey } from "@/lib/request";
import { limitRequest } from "@/lib/rateLimit";

/**
 * POST /api/register
 * Register a new user for a program/event.
 */
export async function POST(req: NextRequest) {
  try {
    const rateKey = getRateLimitKey(req, "register");
    const rate = limitRequest(rateKey);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = validateRegister(body);
    if (!parsed.ok || !parsed.data) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const { name, email, phone, program, address, notes } = parsed.data;

    await connectDB();

    // Check if user with same email already registered for same program
    const existingUser = await User.findOne({ email, program });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "You are already registered for this program",
          userId: existingUser._id,
          paymentStatus: existingUser.paymentStatus,
        },
        { status: 409 }
      );
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      program: program.trim(),
      address: address.trim(),
      notes: notes?.trim() || "",
      paymentToken: crypto.randomBytes(32).toString("hex"),
      paymentStatus: "pending",
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        userId: user._id,
        paymentToken: user.paymentToken,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
