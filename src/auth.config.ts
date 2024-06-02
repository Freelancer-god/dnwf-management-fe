import { login } from "@/services/auth-service";
import credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { NextAuthConfig } from "next-auth";

class CustomError extends CredentialsSignin {
  code = "custom";
}

export default {
  pages: {
    signIn: "/auth/login",
    // error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const response = await login({
          username: credentials?.username,
          password: credentials?.password,
        });

        const user = response?.data;

        if (!response.success) {
          throw new CustomError(response?.error);
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
