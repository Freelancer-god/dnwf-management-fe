import { DataTableDemo } from "@/components/generic-table";
import { fetchUsers } from "@/services/user-service";

export default async function Table() {
  const users = await fetchUsers();

  return <DataTableDemo data={users} />;
}
