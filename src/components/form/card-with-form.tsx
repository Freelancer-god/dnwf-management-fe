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
import { FormField } from "@/components/form/form-field";
import { ZodObject, ZodTypeAny } from "zod";

type FormActionType = string | ((formData: FormData) => Promise<any>);

export default function CardWithForm({
  formId,
  schema,
  formAction,
}: {
  formId: string;
  schema: ZodObject<any>;
  formAction: FormActionType;
}) {
  const modal = useModal();

  const renderFormFields = (schema: ZodObject<any>) => {
    return Object.entries(schema.shape).map(([key, value]) => (
      <FormField key={key} name={key} schema={value as ZodTypeAny} />
    ));
  };

  return (
    <Card className="min-w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[60vh] overflow-y-auto">
        <form id={formId} action={formAction}>
          <div className="grid w-full items-center gap-4">{renderFormFields(schema)}</div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => modal?.hide()}>
          Cancel
        </Button>
        <Button type="submit" form={formId}>
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
