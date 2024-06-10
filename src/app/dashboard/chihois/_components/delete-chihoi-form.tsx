"use client";
import ModalCard from "@/components/form/modal-card";
import { useDeleteChihoi } from "@/services/chihoi-service";

export default function DeleteChihoiForm({ id }: { id: string }) {
  const { mutate, isPending, isSuccess, isError: isCreateBookError } = useDeleteChihoi();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <ModalCard
      formId="delete-chihoi-form"
      metadata={{
        title: "Xoá",
        buttonLabel: "Xoá",
      }}
      onClose={isSuccess}
      isLoading={isPending}
    >
      <form id="delete-chihoi-form" onSubmit={handleSubmit}>
        <div>Bạn có chắc chắn muốn xóa</div>
      </form>
    </ModalCard>
  );
}
