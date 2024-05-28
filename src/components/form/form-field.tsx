import { z, ZodTypeAny } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormField({ name, schema }: { name: string; schema: ZodTypeAny }) {
  if (schema instanceof z.ZodString) {
    return (
      <div className="flex flex-col space-y-1.5 uppercase">
        <Label htmlFor={name}>{name}</Label>
        <Input name={name} id={name} placeholder={`Enter ${name}`} />
      </div>
    );
  }

  if (schema instanceof z.ZodNumber) {
    return (
      <div className="flex flex-col space-y-1.5 uppercase">
        <Label htmlFor={name}>{name}</Label>
        <Input name={name} id={name} type="number" placeholder={`Enter ${name}`} />
      </div>
    );
  }

  if (schema instanceof z.ZodEnum) {
    return (
      <div className="flex flex-col space-y-1.5 uppercase">
        <Label htmlFor={name}>{name}</Label>
        <Select name={name}>
          <SelectTrigger id={name}>
            <SelectValue placeholder={`Select ${name}`} />
          </SelectTrigger>
          <SelectContent>
            {schema.options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
  // Handle other types if necessary
  return null;
}
