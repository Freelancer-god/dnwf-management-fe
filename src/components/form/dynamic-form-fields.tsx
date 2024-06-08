"use client";
import { GenericFormField } from "@/components/form/form-field";
import { Control } from "react-hook-form";
import { ZodObject, ZodTypeAny } from "zod";

export default function DynamicFormFields({ schema, control }: { schema: ZodObject<any>; control: Control<any> }) {
  return Object.entries(schema.shape)
    .filter(([key]) => key !== "id")
    .map(([key, value]) => <GenericFormField key={key} name={key} schema={value as ZodTypeAny} control={control} />);
}
