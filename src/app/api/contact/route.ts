import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (name.trim().length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: `Name must be ${MAX_NAME_LENGTH} characters or less` }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json({ error: "Please provide a valid 10-digit phone number" }, { status: 400 });
    }

    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less` }, { status: 400 });
    }

    const contact = await Contact.create({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      phone: phone.trim(), 
      message: message.trim() 
    });
    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
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
