"use client";
import { createUser } from "@/actions/user-action";
import CardWithForm from "@/components/form/card-with-form";
import { userSchema } from "@/types/user";

export default function CreateUserForm() {
  return <CardWithForm formId="create-user-form" schema={userSchema} formAction={createUser} />;
}
