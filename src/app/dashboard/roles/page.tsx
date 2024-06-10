import { columns } from "@/app/dashboard/roles/_components/columns";
import RoleForm from "@/app/dashboard/roles/_components/role-form";
import { RolesTable } from "@/app/dashboard/roles/_components/roles-table";
import { auth } from "@/auth";
import CreateButton from "@/components/create-button";
import { fetchInitialRoles } from "@/services/role-service";

export default async function RolesPage() {
  const session = await auth();
  const { data: roles, total } = await fetchInitialRoles({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Roles</h1>
        <CreateButton label="Create New Role">
          <RoleForm type="Create" />
        </CreateButton>
      </div>
      <RolesTable columns={columns} initialData={roles} total={total} />
    </>
  );
}
