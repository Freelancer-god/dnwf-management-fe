"use client";
import { Employee, EmployeeFormSchema, employeeSchema } from "@/types/employee";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCard from "@/components/form/modal-card";
import ReactHookForm from "@/components/form/react-hook-form";
import { useCreateEmployee, useEditEmployee } from "@/services/employee-service";
import DynamicFormFields from "@/components/form/dynamic-form-fields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetRoles } from "@/services/role-service";
import BlurryLoader from "@/components/blurry-loader";

export default function EmployeeForm({ type, initialData = {} }: { type: "Create" | "Edit"; initialData?: any }) {
  const { mutate: mutateCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateEmployee();
  const { mutate: mutateEdit, isPending: isPendingEdit, isSuccess: isSuccessEdit } = useEditEmployee();
  const { data: roles, isFetching: isFetchingRole } = useGetRoles();

  const form = useForm<Employee>({
    resolver: zodResolver(EmployeeFormSchema),
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
        <DynamicFormFields schema={employeeSchema} control={form.control} />
        <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Role</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <div className="relative">
                    <BlurryLoader shouldShow={isFetchingRole} dimensions="w-5 h-5" />
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </div>
                </FormControl>
                <SelectContent>
                  {roles?.map((role, index) => (
                    <SelectItem key={index} value={role.id.toString()}>
                      {role.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </ReactHookForm>
    </ModalCard>
  );
}
