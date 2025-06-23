import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/lib/db";
import { users } from "@/app/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
      
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });
      
        if (!user || !user.password) return null;
      
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
      
        // ✅ Convert id to string before returning
        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      ,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // On first login, user is available → assign initial token data
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      } else if (token?.email) {
        // Always sync role from DB on subsequent calls
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, token.email),
        });
        if (existingUser?.role) token.role = existingUser.role;
      }
  
      return token;
    },
    async session({ session, token }) {
      // Add role and id to session.user
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
