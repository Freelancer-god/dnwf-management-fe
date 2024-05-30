import { DataTableDemo } from "@/components/generic-table";
import { getUsers } from "@/services/user-service";

export default async function TableUsers() {
  const users = await getUsers();
  return <DataTableDemo data={users} />;
}
