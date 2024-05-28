import { createUser } from "@/actions/user-action";
import { CardWrapper } from "@/components/form/card-wrapper";
import { FormField } from "@/components/form/form-field";
import { userSchema } from "@/types/user";
import { ZodObject, ZodTypeAny } from "zod";

export default function CardWithForm({ formId }: { formId: string }) {
  const renderFormFields = (schema: ZodObject<any>) => {
    return Object.entries(schema.shape).map(([key, value]) => (
      <FormField key={key} name={key} schema={value as ZodTypeAny} />
    ));
  };

  return (
    <CardWrapper formId={formId}>
      <form id={formId} action={createUser}>
        <div className="grid w-full items-center gap-4">{renderFormFields(userSchema)}</div>
      </form>
    </CardWrapper>
  );
}
