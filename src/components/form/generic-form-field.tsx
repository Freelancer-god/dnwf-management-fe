import { z, ZodTypeAny } from "zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import React from "react";
import { DateTimePicker } from "@/components/form/flexible-date-picker";
import { snakeToHumanReadable, unwrapZodSchema } from "@/lib/utils";

export function GenericFormField({
  name,
  schema,
  control,
  overrideComponent,
}: {
  name: string;
  schema: ZodTypeAny;
  control: Control<any>;
  overrideComponent?: JSX.Element;
}) {
  const getFieldComponent = (props) => {
    if (overrideComponent) {
      return React.cloneElement(overrideComponent, props);
    }

    schema = unwrapZodSchema(schema);

    if (schema instanceof z.ZodDate) return <DateTimePicker label={name} name={name} id={name} {...props} />;
    if (schema instanceof z.ZodString) return <Input name={name} id={name} type="text" {...props} />;
    if (schema instanceof z.ZodNumber) return <Input name={name} id={name} type="number" {...props} />;
    if (schema instanceof z.ZodEnum) {
      return (
        <Select name={name} onValueChange={props.onChange} defaultValue={props.value} {...props}>
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
    return <Input name={name} id={name} type="text" {...props} />; // Default to text input
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{snakeToHumanReadable(name)}</FormLabel>
          <FormControl>{getFieldComponent(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
