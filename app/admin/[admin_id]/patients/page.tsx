import { DataTable } from "@/components/admin-patients-table/data-table";
import { MainNav } from "@/components/mainNav";
import { getAllPatients } from "../../utils";
import { columns } from "@/components/admin-patients-table/columns";
import { Metadata } from "next";
import { AdminUserNav } from "@/components/admin-dashboard/user-nav";

interface pageProps {
  params: { admin_id: string };
}

export const metadata: Metadata = {
  title: "Patients | Dokko",
  description: "Doctors",
};
export default async function Page({ params }: pageProps) {
  const fetchedPatients = await getAllPatients();
  const patients = fetchedPatients.data.patients.data.map((patient: any) => {
    return {
      id: [patient.id, patient.attributes.uid],
      fullName: patient.attributes.fullName,
      uid: patient.attributes.uid,
      email: patient.attributes.email,
      phoneNumber: patient.attributes.phoneNumber,
      address: patient.attributes.address,
    };
  });

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav
              className="mx-6"
              {...{ id: params.admin_id, type: "admin" }}
            />
            <div className="ml-auto flex items-center space-x-4">
              <AdminUserNav />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-y-2 p-8 pt-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the patients.
            </p>
          </div>
        </div>
        <div className="p-8 pt-2">
          <DataTable data={patients} columns={columns} />
        </div>
      </div>
    </>
  );
}
