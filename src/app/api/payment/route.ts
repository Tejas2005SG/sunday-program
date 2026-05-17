import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * POST /api/payment
 * Submit a transaction ID for a registered user.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, transactionId } = body;

    if (!userId || !transactionId) {
      return NextResponse.json(
        { error: "User ID and transaction ID are required" },
        { status: 400 }
      );
    }

    if (transactionId.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a valid transaction ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update with transaction details
    user.transactionId = transactionId.trim();
    user.paymentSubmittedAt = new Date();
    await user.save();

    return NextResponse.json(
      { message: "Payment details submitted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Payment submission error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
