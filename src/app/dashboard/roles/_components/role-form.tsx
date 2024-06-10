"use client";
import { Role, roleSchema } from "@/types/role";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCard from "@/components/form/modal-card";
import ReactHookForm from "@/components/form/react-hook-form";
import { useCreateRole, useEditRole } from "@/services/role-service";
import DynamicFormFields from "@/components/form/dynamic-form-fields";
import { PasswordInput } from "@/components/ui/toggle-able-password";

export default function RoleForm({ type, initialData = {} }: { type: "Create" | "Edit"; initialData?: any }) {
  const { mutate: mutateCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateRole();
  const { mutate: mutateEdit, isPending: isPendingEdit, isSuccess: isSuccessEdit } = useEditRole();

  const form = useForm<Role>({
    resolver: zodResolver(roleSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (values: Role) => {
    if (type === "Create") mutateCreate(values);
    if (type === "Edit") mutateEdit(values);
  };

  return (
    <ModalCard
      form={form}
      formId={`${type}-role-form`}
      metadata={{
        title: type,
        buttonLabel: type,
      }}
      isLoading={isPendingCreate || isPendingEdit}
      onClose={isSuccessCreate || isSuccessEdit}
    >
      <ReactHookForm formId={`${type}-role-form`} form={form} onSubmit={handleSubmit} schema={roleSchema}>
        <DynamicFormFields
          schema={roleSchema}
          control={form.control}
          overrides={{
            password: <PasswordInput name="password" />,
          }}
        />
      </ReactHookForm>
    </ModalCard>
  );
}
