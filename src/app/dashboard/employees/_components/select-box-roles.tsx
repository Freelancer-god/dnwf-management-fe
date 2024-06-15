import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetRoles } from "@/services/role-service";
import BlurryLoader from "@/components/blurry-loader";

export default function SelectBoxRoles({ form }) {
  const { data: roles, isFetching: isFetchingRole } = useGetRoles();

  return (
    <Select>
      <div className="relative">
        <BlurryLoader shouldShow={isFetchingRole} dimensions="w-5 h-5" />
        <SelectTrigger>
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
      </div>
      <SelectContent>
        {roles?.map((role, index) => (
          <SelectItem key={index} value={role.id.toString()}>
            {role.display_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
