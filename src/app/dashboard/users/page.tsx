import { columns } from "@/app/dashboard/users/_components/columns";
import CreateUserForm from "@/app/dashboard/users/_components/create-user-form";
import { UsersTable } from "@/app/dashboard/users/_components/users-table";
import CreateButton from "@/components/create-button";
import { fetchUsers } from "@/services/user-service";

export default async function UsersPage() {
  // const users = await fetchUsers();
  const users = await fetchUsers();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <CreateButton label="Create New User">
          <CreateUserForm />
        </CreateButton>
      </div>
      <UsersTable columns={columns} initialData={users} />
      {/* <DataTableDemo data={users} /> */}
    </>
  );
}
