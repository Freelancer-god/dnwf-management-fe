import CreateButton from "@/components/create-button";
import { CardWithForm } from "@/components/form-card";
import { DataTableDemo } from "@/components/generic-table";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/services/user-service";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <CreateButton label="Create New User">
          <CardWithForm />
        </CreateButton>
      </div>
      {users.length > 0 ? <DataTableDemo data={users} /> : <EmptyUser />}
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
