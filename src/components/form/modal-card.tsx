"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/components/modal/provider";
import { LoadingButton } from "@/components/ui/button-with-loading";
import { UseFormReturn } from "react-hook-form";

type ModalCardProps = {
  form: UseFormReturn<any>;
  formId: string;
  children: React.ReactNode;
  metadata: {
    title: string;
    description?: string;
    buttonLabel?: string;
  };
};

export default function ModalCard({ form, formId, children, metadata }: ModalCardProps) {
  const modal = useModal();

  // Hide modal after submitted
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      return modal?.hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isSubmitSuccessful]);

  return (
    <Card className="min-w-[350px]">
      <CardHeader>
        <CardTitle>{metadata.title}</CardTitle>
        <CardDescription>{metadata.description}</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[60vh] overflow-y-auto">{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => modal?.hide()}>
          Cancel
        </Button>
        <LoadingButton type="submit" form={formId} loading={form.formState.isSubmitting}>
          {metadata.buttonLabel}
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
