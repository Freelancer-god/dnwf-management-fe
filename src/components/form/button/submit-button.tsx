"use client";
import { LoadingButton } from "@/components/ui/button-with-loading";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ label }) {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      className="flex h-auto w-full justify-start p-0 text-left"
      variant="ghost"
      asChild
      loading={pending}
    >
      <button type="submit">{label}</button>
    </LoadingButton>
  );
}
