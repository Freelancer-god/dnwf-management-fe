import CreateUserForm from "@/app/dashboard/users/_components/create-user-form";
import CreateButton from "@/components/create-button";
import { DataTableDemo } from "@/components/generic-table";
import { getUsers } from "@/services/user-service";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <CreateButton label="Create New User">
          <CreateUserForm />
        </CreateButton>
      </div>
      <DataTableDemo data={users} />
    </>
  );
}
