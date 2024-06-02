import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.accessToken = token?.token as any;
      session.user = token?.data as any;
      return session;
    },
  },
  ...authConfig,
});
