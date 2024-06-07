"use client";
import ModalCard from "@/components/form/modal-card";
import { useDeleteUser } from "@/services/user-service";

export default function DeleteUserForm({ id }: { id: string }) {
  const { mutate, isPending, isSuccess, isError: isCreateBookError } = useDeleteUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <ModalCard
      formId="delete-user-form"
      metadata={{
        title: "Xoá",
        buttonLabel: "Xoá",
      }}
      onClose={isSuccess}
      isLoading={isPending}
    >
      <form id="delete-user-form" onSubmit={handleSubmit}>
        <div>Bạn có chắc chắn muốn xóa</div>
      </form>
    </ModalCard>
  );
}
