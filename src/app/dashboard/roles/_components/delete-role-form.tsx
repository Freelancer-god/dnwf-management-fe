"use client";
import ModalCard from "@/components/form/modal-card";
import { useDeleteRole } from "@/services/role-service";

export default function DeleteRoleForm({ id }: { id: string }) {
  const { mutate, isPending, isSuccess, isError: isCreateBookError } = useDeleteRole();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <ModalCard
      formId="delete-role-form"
      metadata={{
        title: "Xoá",
        buttonLabel: "Xoá",
      }}
      onClose={isSuccess}
      isLoading={isPending}
    >
      <form id="delete-role-form" onSubmit={handleSubmit}>
        <div>Bạn có chắc chắn muốn xóa</div>
      </form>
    </ModalCard>
  );
}
