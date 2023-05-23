import { MainNav } from "@/components/mainNav";
import { getAllDoctors, getAllPatients } from "../../utils";
import { columns } from "@/components/admin-doctors-table/columns";
import { DataTable } from "@/components/admin-doctors-table/data-table";
import { Metadata } from "next";

interface pageProps {
  params: { admin_id: string };
}
export const metadata: Metadata = {
  title: "Doctors | Dokko",
  description: "Doctors",
};

export default async function Page({ params }: pageProps) {
  const fetchedDoctors = await getAllDoctors();
  const doctors = fetchedDoctors.data.doctors.data.map((doctor: any) => {
    return {
      id: [doctor.id, doctor.attributes.uid],
      fullName: doctor.attributes.fullName,
      uid: doctor.attributes.uid,
      email: doctor.attributes.email,
      address: doctor.attributes.address,
      specialty: doctor.attributes.specialty || "N/A",
    };
  });
  console.log(doctors);

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
              {/* <UserNavPatient id={id} type={"patient"} patient={patient} /> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-y-2 p-8 pt-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Doctors</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the doctors.
            </p>
          </div>
        </div>
        <div className="p-8 pt-2">
          <DataTable data={doctors} columns={columns} />
        </div>
      </div>
    </>
  );
}
