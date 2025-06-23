import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ Must match token.id (which is now string)
      name?: string;
      email?: string;
      role?: string;
    };
  }

  interface User {
    id: string; // ✅ Also string here
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // ✅ Match session.user.id
    role?: string;
  }
}
