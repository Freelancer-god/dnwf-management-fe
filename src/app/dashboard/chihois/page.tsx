import { columns } from "@/app/dashboard/chihois/_components/columns";
import ChihoiForm from "@/app/dashboard/chihois/_components/chihoi-form";
import { ChihoisTable } from "@/app/dashboard/chihois/_components/chihois-table";
import { auth } from "@/auth";
import CreateButton from "@/components/create-button";
import { fetchInitialChihois } from "@/services/chihoi-service";

export default async function ChihoisPage() {
  const session = await auth();
  const { data: chihois, total } = await fetchInitialChihois({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Chihois</h1>
        <CreateButton label="Create New Chihoi">
          <ChihoiForm type="Create" />
        </CreateButton>
      </div>
      <ChihoisTable columns={columns} initialData={chihois} total={total} />
    </>
  );
}
