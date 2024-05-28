"use server";

import { userSchema } from "@/types/user";

export async function createUser(formData: FormData) {
  const rawFormData = Object.fromEntries(formData); // Get all form Data
  const validatedFields = userSchema.safeParse(rawFormData); // Validate using Zod
  console.log(validatedFields.error?.flatten().fieldErrors);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
