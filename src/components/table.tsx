import { DataTableDemo } from "@/components/generic-table";
import { getUsers } from "@/services/user-service";

export default async function Table() {
  const users = await getUsers();

  return <DataTableDemo data={users} />;
}
