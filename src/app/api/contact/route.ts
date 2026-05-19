import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { validateContact } from "@/lib/validation";
import { getRateLimitKey } from "@/lib/request";
import { limitRequest } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const rateKey = getRateLimitKey(req, "contact");
    const rate = limitRequest(rateKey);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    await connectDB();
    const body = await req.json();
    const parsed = validateContact(body);
    if (!parsed.ok || !parsed.data) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const { name, email, phone, message } = parsed.data;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });
    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
