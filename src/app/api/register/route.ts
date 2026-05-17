import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * POST /api/register
 * Register a new user for a program/event.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, program, notes } = body;

    // Validation
    if (!name || !email || !phone || !program) {
      return NextResponse.json(
        { error: "Name, email, phone, and program are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit phone number" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user with same email already registered for same program
    const existingUser = await User.findOne({ email, program });
    if (existingUser) {
      return NextResponse.json(
        { error: "You have already registered for this program", userId: existingUser._id },
        { status: 409 }
      );
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      program: program.trim(),
      notes: notes?.trim() || "",
      paymentStatus: "pending",
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        userId: user._id,
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
