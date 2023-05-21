import { MainNav } from "@/components/mainNav";
import {
  getAllAppointments,
  getAllDoctors,
  getAllPatients,
  getAllPrescriptions,
} from "../../utils";
import { DataTable } from "@/components/admin-prescriptions-table/data-table";
import { columns } from "@/components/admin-prescriptions-table/columns";
import { Metadata } from "next";

interface pageProps {
  params: { admin_id: string };
}

export const metadata: Metadata = {
  title: "Prescriptions | Dokko",
  description: "Prescriptions",
};
export default async function Page({ params }: pageProps) {
  const fetchedPrescriptions = await getAllPrescriptions();
  const fetchedAppointments = await getAllAppointments();

  const prescriptions = fetchedPrescriptions.data.prescriptions.data.map(
    (prescription: any) => {
      return {
        id: [prescription.id, prescription.attributes.uid],
        patient: [
          prescription.attributes.patient.data.attributes.fullName,
          prescription.attributes.patient.data.attributes.uid,
          prescription.attributes.patient.data.id,
        ],

        doctor: [
          prescription.attributes.doctor.data.attributes.fullName,
          prescription.attributes.doctor.data.attributes.uid,
          prescription.attributes.doctor.data.id,
        ],
        appointment: prescription.attributes.appointment.data.id,
        uid: prescription.attributes.uid,
        diagnosis: [
          prescription.attributes.diagnosis,
          prescription.attributes.prescription,
          prescription.attributes.notes,
        ],
      };
    }
  );

  const appointments = fetchedAppointments.data.appointments.data.map(
    (appointment: any) => {
      return {
        id: [appointment.id, appointment.attributes.uid],
        patient: [
          appointment.attributes.patient.data.attributes.fullName,
          appointment.attributes.patient.data.attributes.uid,
          appointment.attributes.patient.data.id,
        ],
        doctor: [
          appointment.attributes.doctor.data.attributes.fullName,
          appointment.attributes.doctor.data.attributes.uid,
          appointment.attributes.doctor.data.id,
        ],
        appointment: appointment.attributes.appointment,
        uid: appointment.attributes.uid,
        diagnosis: [
          appointment.attributes.diagnosis,
          appointment.attributes.prescription,
          appointment.attributes.notes,
        ],
      };
    }
  );

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
            <h2 className="text-2xl font-bold tracking-tight">Prescriptions</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the prescriptions.
            </p>
          </div>
        </div>
        <div className="p-8 pt-2">
          <DataTable
            data={prescriptions}
            columns={columns}
            appointments={appointments}
          />
        </div>
      </div>
    </>
  );
}
