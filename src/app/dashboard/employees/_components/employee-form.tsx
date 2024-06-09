"use client";
import { Employee, employeeSchema } from "@/types/employee";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCard from "@/components/form/modal-card";
import ReactHookForm from "@/components/form/react-hook-form";
import { useCreateEmployee, useEditEmployee } from "@/services/employee-service";
import DynamicFormFields from "@/components/form/dynamic-form-fields";
import { PasswordInput } from "@/components/ui/toggle-able-password";

export default function EmployeeForm({ type, initialData = {} }: { type: "Create" | "Edit"; initialData?: any }) {
  const { mutate: mutateCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateEmployee();
  const { mutate: mutateEdit, isPending: isPendingEdit, isSuccess: isSuccessEdit } = useEditEmployee();

  const form = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (values: Employee) => {
    if (type === "Create") mutateCreate(values);
    if (type === "Edit") mutateEdit(values);
  };

  return (
    <ModalCard
      form={form}
      formId={`${type}-employee-form`}
      metadata={{
        title: type,
        buttonLabel: type,
      }}
      isLoading={isPendingCreate || isPendingEdit}
      onClose={isSuccessCreate || isSuccessEdit}
    >
      <ReactHookForm formId={`${type}-employee-form`} form={form} onSubmit={handleSubmit} schema={employeeSchema}>
        <DynamicFormFields
          schema={employeeSchema}
          control={form.control}
          overrides={{
            password: <PasswordInput name="password" />,
          }}
        />
      </ReactHookForm>
    </ModalCard>
  );
}
