"use client";
import { Chihoi, chihoiSchema } from "@/types/chihoi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCard from "@/components/form/modal-card";
import ReactHookForm from "@/components/form/react-hook-form";
import { useCreateChihoi, useEditChihoi } from "@/services/chihoi-service";
import DynamicFormFields from "@/components/form/dynamic-form-fields";
import { PasswordInput } from "@/components/ui/toggle-able-password";

export default function ChihoiForm({ type, initialData = {} }: { type: "Create" | "Edit"; initialData?: any }) {
  const { mutate: mutateCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateChihoi();
  const { mutate: mutateEdit, isPending: isPendingEdit, isSuccess: isSuccessEdit } = useEditChihoi();

  const form = useForm<Chihoi>({
    resolver: zodResolver(chihoiSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (values: Chihoi) => {
    if (type === "Create") mutateCreate(values);
    if (type === "Edit") mutateEdit(values);
  };

  return (
    <ModalCard
      form={form}
      formId={`${type}-chihoi-form`}
      metadata={{
        title: type,
        buttonLabel: type,
      }}
      isLoading={isPendingCreate || isPendingEdit}
      onClose={isSuccessCreate || isSuccessEdit}
    >
      <ReactHookForm formId={`${type}-chihoi-form`} form={form} onSubmit={handleSubmit} schema={chihoiSchema}>
        <DynamicFormFields
          schema={chihoiSchema}
          control={form.control}
          overrides={
            {
              // password: <PasswordInput name="password" />,
            }
          }
        />
      </ReactHookForm>
    </ModalCard>
  );
}
