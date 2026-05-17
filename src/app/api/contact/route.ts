import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const contact = await Contact.create({ name, email, phone, message });
    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
