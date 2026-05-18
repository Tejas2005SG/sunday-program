import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (more generous for high-res screenshots)

function isValidImageFile(file: File): { valid: boolean; error?: string } {
    const fileType = file.type ? file.type.toLowerCase() : "";
    const fileName = file.name ? file.name.toLowerCase() : "";
    
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/octet-stream'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
    
    const isAllowedMime = allowedMimes.includes(fileType);
    const isAllowedExt = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isAllowedMime && !isAllowedExt) {
        return { valid: false, error: "Only JPG, JPEG, PNG, WebP, and HEIC images are allowed" };
    }
    if (file.size > MAX_FILE_SIZE) {
        return { valid: false, error: "File size must be less than 10MB" };
    }
    return { valid: true };
}

/**
 * POST /api/payment
 * Submit a transaction ID for a registered user.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const transactionId = formData.get("transactionId") as string;
    const file = formData.get("screenshot") as File | null;

    if (!userId || !transactionId || !file) {
      return NextResponse.json(
        { error: "User ID, transaction ID, and screenshot are required" },
        { status: 400 }
      );
    }

    if (transactionId.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a valid transaction ID" },
        { status: 400 }
      );
    }

    const fileValidation = isValidImageFile(file);
    if (!fileValidation.valid) {
      return NextResponse.json({ error: fileValidation.error }, { status: 400 });
    }

    // Upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "payment_screenshots",
      public_id: `payment_${userId}_${Date.now()}`,
    });

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update with transaction details and screenshot URL
    user.transactionId = transactionId.trim();
    user.screenshotUrl = uploadResult.secure_url;
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
