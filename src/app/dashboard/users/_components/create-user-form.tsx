"use client";
import { User, userSchema } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCard from "@/components/form/modal-card";
import ReactHookForm from "@/components/form/react-hook-form";

export default function CreateUserForm() {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  });

  const handleSubmit = (values: User) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
  };

  return (
    <ModalCard
      form={form}
      formId="create-user-form"
      metadata={{
        title: "Create",
        buttonLabel: "Create",
      }}
    >
      <ReactHookForm
        formId="create-user-form"
        form={form}
        onSubmit={handleSubmit}
        schema={userSchema}
      ></ReactHookForm>
    </ModalCard>
  );
}
