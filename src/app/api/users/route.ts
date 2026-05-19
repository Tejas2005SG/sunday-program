import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { logAuditAction } from "@/lib/auditLog";

/**
 * GET /api/users
 * Fetch all registered users (admin only).
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const requestedLimit = Math.max(parseInt(searchParams.get("limit") || "20"), 1);
    const limit = Math.min(requestedLimit, 100);
    const skip = (page - 1) * limit;

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    // Search filter
    const trimmedSearch = search.trim();
    if (trimmedSearch && trimmedSearch.length <= 100) {
      query.$or = [
        { name: { $regex: trimmedSearch, $options: "i" } },
        { email: { $regex: trimmedSearch, $options: "i" } },
        { phone: { $regex: trimmedSearch, $options: "i" } },
        { transactionId: { $regex: trimmedSearch, $options: "i" } },
      ];
    }

    // Status filter
    if (status !== "all") {
      query.paymentStatus = status;
    }

    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(query),
    ]);

    // Get statistics
    const [totalRegistrations, pendingPayments, paidUsers, todayRegistrations] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ paymentStatus: "pending" }),
        User.countDocuments({ paymentStatus: "paid" }),
        User.countDocuments({
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        }),
      ]);

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalRegistrations,
        pendingPayments,
        paidUsers,
        todayRegistrations,
      },
    });
  } catch (error: unknown) {
    console.error("Fetch users error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/users?id=<userId>
 * Delete a user registration (admin only).
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await logAuditAction(
      "user_delete",
      (session.user as { id?: string }).id || "unknown",
      session.user.email || "unknown",
      id,
      "user",
      { 
        deletedUserName: user.name,
        deletedUserEmail: user.email,
        deletedUserProgram: user.program,
        paymentStatus: user.paymentStatus
      }
    );

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: unknown) {
    console.error("Delete user error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
