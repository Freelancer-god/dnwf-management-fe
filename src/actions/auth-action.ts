"use server";

import { AuthError } from "next-auth";
import { LoginSchema, LoginType } from "@/types/user-profile";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, SIGN_IN_ROUTE } from "@/routes";
import { toast } from "sonner";

export async function login(values: LoginType) {
  const validatedFields = LoginSchema.safeParse(values); // Validate using Zod

  if (!validatedFields?.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: error.message || "CredentialsSignin Error" };
        case "CallbackRouteError":
          return { error: error.cause?.err?.message };
        default:
          return { error: "Đã xảy ra lỗi" };
      }
    }

    throw error;
  }
}

export async function signOutAction() {
  try {
    return await signOut({
      redirectTo: SIGN_IN_ROUTE,
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return { error: "Đã xảy ra lỗi" };
      }
    }

    throw error;
  }
}
