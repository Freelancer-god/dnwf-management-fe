"use client";
import ImageUpload from "@/components/form/antd-image-upload";
import ModalCard from "@/components/form/modal-card";
import { useDeleteChihoi } from "@/services/chihoi-service";

export default function UploadChihoiForm({ id }: { id: string }) {
  // const { mutate, isPending, isSuccess, isError: isCreateBookError } = useDeleteChihoi();

  const handleSubmit = (e) => {
    e.preventDefault();
    // mutate(id);
  };

  return (
    <ModalCard
      formId="upload-chihoi-form"
      metadata={{
        title: "Upload ảnh",
        buttonLabel: "Upload ảnh",
      }}
      // onClose={isSuccess}
      // isLoading={isPending}
    >
      <form id="upload-chihoi-form" onSubmit={handleSubmit}>
        <ImageUpload onUpload={() => {}} />
      </form>
    </ModalCard>
  );
}
