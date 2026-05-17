import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

// Protect only admin dashboard routes
export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
