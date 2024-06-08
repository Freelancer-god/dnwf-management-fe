"use client";
import { GenericFormField } from "@/components/form/form-field";
import { CREATE_EDIT_FIELDS_EXCLUDE } from "@/lib/constants";
import { Control } from "react-hook-form";
import { ZodObject, ZodTypeAny } from "zod";

export default function DynamicFormFields({
  schema,
  control,
  overrides = {},
}: {
  schema: ZodObject<any>;
  control: Control<any>;
  overrides?: Record<string, JSX.Element>;
}) {
  return Object.entries(schema.shape)
    .filter(([key]) => !CREATE_EDIT_FIELDS_EXCLUDE.includes(key))
    .map(([key, value]) => (
      <GenericFormField
        key={key}
        name={key}
        schema={value as ZodTypeAny}
        control={control}
        overrideComponent={overrides[key]}
      />
    ));
}
