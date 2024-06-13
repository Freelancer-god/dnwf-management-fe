"use client";
import { PermissionID, Role, roleSchema } from "@/types/role";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCard from "@/components/form/modal-card";
import ReactHookForm from "@/components/form/react-hook-form";
import { useCreateRole, useEditRole } from "@/services/role-service";
import DynamicFormFields from "@/components/form/dynamic-form-fields";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";

export default function RoleForm({ type, initialData = {} }: { type: "Create" | "Edit"; initialData?: Role }) {
  const { mutate: mutateCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate } = useCreateRole();
  const { mutate: mutateEdit, isPending: isPendingEdit, isSuccess: isSuccessEdit } = useEditRole();

  const form = useForm<Role>({
    resolver: zodResolver(roleSchema),
    defaultValues: initialData,
  });
  const handleSubmit = (values: Role) => {
    // Handle permissions_id format: from [{label: 'test', value: '1'}] to ['1', '2']
    const permissionIds = values.permission_ids as Option[];
    values.permission_ids = permissionIds?.length > 0 && permissionIds.map(({ value }) => value);

    if (type === "Create") mutateCreate(values);
    if (type === "Edit") mutateEdit(values);
  };

  const defaultOptions = Object.entries(PermissionID).map(([key, value]) => ({
    value: value as string,
    label: key as string,
  }));

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
            permission_ids: (
              <MultipleSelector
                defaultOptions={defaultOptions}
                placeholder="Chọn Quyền..."
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>
                }
              />
            ),
          }}
        />
      </ReactHookForm>
    </ModalCard>
  );
}
