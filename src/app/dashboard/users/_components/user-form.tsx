"use client";
import { User, userSchema } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCard from "@/components/form/modal-card";
import ReactHookForm from "@/components/form/react-hook-form";
import { useCreateUser, useEditUser } from "@/services/user-service";

export default function UserForm({ type, initialData = {} }: { type: "Create" | "Edit"; initialData?: any }) {
  const { mutate: mutateCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateUser();
  const { mutate: mutateEdit, isPending: isPendingEdit, isSuccess: isSuccessEdit } = useEditUser();

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (values: User) => {
    if (type === "Create") mutateCreate(values);
    if (type === "Edit") mutateEdit(values);
  };

  return (
    <ModalCard
      form={form}
      formId={`${type}-user-form`}
      metadata={{
        title: type,
        buttonLabel: type,
      }}
      isLoading={isPendingCreate || isPendingEdit}
      onClose={isSuccessCreate || isSuccessEdit}
    >
      <ReactHookForm
        formId={`${type}-user-form`}
        form={form}
        onSubmit={handleSubmit}
        schema={userSchema}
      ></ReactHookForm>
    </ModalCard>
  );
}
