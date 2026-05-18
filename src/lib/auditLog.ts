import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["payment_status_update", "user_delete", "login", "logout"],
    },
    adminId: {
      type: String,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
    },
    targetId: {
      type: String,
    },
    targetType: {
      type: String,
      enum: ["user", "admin", null],
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  { timestamps: true }
);

auditLogSchema.index({ adminId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

export const AuditLog = mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);

export async function logAuditAction(
  action: string,
  adminId: string,
  adminEmail: string,
  targetId?: string,
  targetType?: string,
  details?: object,
  ipAddress?: string,
  userAgent?: string
) {
  try {
    await AuditLog.create({
      action,
      adminId,
      adminEmail,
      targetId,
      targetType,
      details,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.error("Failed to log audit action:", error);
  }
}