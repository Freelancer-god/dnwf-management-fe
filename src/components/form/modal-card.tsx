"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useModal } from "@/components/modal/provider";
import { LoadingButton } from "@/components/ui/button-with-loading";
import { UseFormReturn } from "react-hook-form";

type ModalCardProps = {
  form?: UseFormReturn<any>;
  formId: string;
  children: React.ReactNode;
  metadata: {
    title: string;
    description?: string;
    buttonLabel?: string;
  };
  onClose?: boolean;
  isLoading?: boolean;
};

export default function ModalCard({ form, formId, children, metadata, onClose, isLoading }: ModalCardProps) {
  const modal = useModal();

  // Hide modal after submitted
  React.useEffect(() => {
    if (onClose) {
      return modal?.hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return (
    <Card className="min-w-[450px]">
      <CardHeader>
        <CardTitle>{metadata.title}</CardTitle>
        <CardDescription>{metadata.description}</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[60vh] overflow-y-auto">{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => modal?.hide()}>
          Cancel
        </Button>
        <LoadingButton type="submit" form={formId} loading={form?.formState.isSubmitting || isLoading}>
          {metadata.buttonLabel}
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
