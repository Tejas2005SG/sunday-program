import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * PUT /api/pay/[id]
 * Update payment status for a user (admin only).
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { paymentStatus } = body;

    if (!paymentStatus || !["pending", "paid"].includes(paymentStatus)) {
      return NextResponse.json(
        { error: "Valid payment status is required (pending or paid)" },
        { status: 400 }
      );
    }

    await connectDB();

    const updateData: Record<string, unknown> = {
      paymentStatus,
    };

    // Set paidAt timestamp when marking as paid
    if (paymentStatus === "paid") {
      updateData.paidAt = new Date();
    } else {
      updateData.paidAt = null;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Payment status updated to ${paymentStatus}`,
      user,
    });
  } catch (error: unknown) {
    console.error("Update payment error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
