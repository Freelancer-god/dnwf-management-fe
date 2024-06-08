import { Form } from "@/components/ui/form";
import DynamicFormFields from "@/components/form/dynamic-form-fields";
import { ReactNode } from "react";
import { ZodObject } from "zod";

type ReactHookFormProps = {
  form: any;
  formId: string;
  onSubmit: (values) => void;
  schema: ZodObject<any>;
  children?: ReactNode;
};

export default function ReactHookForm({ form, formId, onSubmit, schema, children }: ReactHookFormProps) {
  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          {!children && <DynamicFormFields schema={schema} control={form.control} />}
          {children && children}
        </div>
      </form>
    </Form>
  );
}
