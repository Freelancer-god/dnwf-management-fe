import { DataTableDemo } from "@/components/generic-table";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const users = [{}];

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      {users.length > 0 ? <DataTableDemo /> : <EmptyUser />}
    </>
  );
}

function EmptyUser() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">You have no users</h3>
        <Button className="mt-4">Add User</Button>
      </div>
    </div>
  );
}