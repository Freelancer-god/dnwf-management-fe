"use client";
import ModalCard from "@/components/form/modal-card";
import { useDeleteEmployee } from "@/services/employee-service";

export default function DeleteEmployeeForm({ id }: { id: string }) {
  const { mutate, isPending, isSuccess, isError: isCreateBookError } = useDeleteEmployee();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <ModalCard
      formId="delete-employee-form"
      metadata={{
        title: "Xoá",
        buttonLabel: "Xoá",
      }}
      onClose={isSuccess}
      isLoading={isPending}
    >
      <form id="delete-employee-form" onSubmit={handleSubmit}>
        <div>Bạn có chắc chắn muốn xóa</div>
      </form>
    </ModalCard>
  );
}
