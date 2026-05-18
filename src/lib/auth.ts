import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { checkRateLimit, clearRateLimit } from "./rateLimit";
import { logAuditAction } from "./auditLog";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const rateLimit = checkRateLimit(credentials.email);
        if (!rateLimit.allowed) {
          const waitTime = Math.ceil(((rateLimit.lockedUntil || 0) - Date.now()) / 60000);
          throw new Error("Too many attempts. Please try again in " + waitTime + " minutes");
        }

        await connectDB();

        const admin = await Admin.findOne({ email: credentials.email });
        if (!admin) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        clearRateLimit(credentials.email);

        return {
          id: admin._id.toString(),
          email: admin.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "update") {
        token.lastActivity = Date.now();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.id && user.email) {
        await logAuditAction("login", user.id, user.email, undefined, "admin");
      }
    },
    async signOut({ token }) {
      if (token?.id && token?.email) {
        await logAuditAction("logout", token.id as string, token.email as string, undefined, "admin");
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};