import { z, ZodTypeAny } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";

export function GenericFormField({
  name,
  schema,
  control,
}: {
  name: string;
  schema: ZodTypeAny;
  control: Control<any>;
}) {
  const getFieldComponent = (props) => {
    if (schema instanceof z.ZodString)
      return <Input name={name} id={name} type="text" {...props} />;
    if (schema instanceof z.ZodNumber)
      return <Input name={name} id={name} type="number" {...props} />;
    if (schema instanceof z.ZodEnum) {
      return (
        <Select name={name} {...props}>
          <SelectTrigger id={name}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {schema.options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    return <Input name={name} id={name} type="text" />; // Default to text input
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>{getFieldComponent(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
