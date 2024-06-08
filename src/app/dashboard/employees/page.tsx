import { columns } from "@/app/dashboard/employees/_components/columns";
import EmployeeForm from "@/app/dashboard/employees/_components/employee-form";
import { EmployeesTable } from "@/app/dashboard/employees/_components/employees-table";
import { auth } from "@/auth";
import CreateButton from "@/components/create-button";
import { fetchInitialEmployees } from "@/services/employee-service";
import { employeeSchema } from "@/types/employee";

export default async function EmployeesPage() {
  const session = await auth();
  const { data: employees, total } = await fetchInitialEmployees(
    { page: 1, limit: 10, filter: {} },
    {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Employees</h1>
        <CreateButton label="Create New Employee">
          <EmployeeForm type="Create" />
        </CreateButton>
      </div>
      <EmployeesTable columns={columns} initialData={employees} total={total} />
    </>
  );
}
