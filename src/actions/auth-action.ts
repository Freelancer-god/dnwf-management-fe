"use server";

import { UserProfileRequestSchema } from "@/types/user-profile";
import { signIn } from "next-auth/react";

export async function login(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData); // Get all form Data
  const validatedFields = UserProfileRequestSchema.safeParse(rawFormData); // Validate using Zod

  console.log(validatedFields.error?.flatten().fieldErrors);

  if (!validatedFields?.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await signIn("credentials", {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: true,
      callbackUrl: "/",
    });
    console.log("🚀 ~ login ~ result:", result);
    if (result?.error) {
      return {
        errors: { credentials: "Invalid email or password" },
      };
    }
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
  }

  return {
    message: "",
  };
}
