import { MainNav } from "@/components/mainNav";
import { getAllAppointments, getAllDoctors, getAllPatients } from "../../utils";
import { DataTable } from "@/components/admin-appointments-table/data-table";
import { columns } from "@/components/admin-appointments-table/columns";
import { Metadata } from "next";
import { AdminUserNav } from "@/components/admin-dashboard/user-nav";

interface pageProps {
  params: { admin_id: string };
}

export const metadata: Metadata = {
  title: "Dokko | Appointments",
  description: "Appointments",
};

export default async function Page({ params }: pageProps) {
  const fetchedAppointments = await getAllAppointments();
  const fetchedDoctors = await getAllDoctors();
  const fetchedPatients = await getAllPatients();

  const patients = fetchedPatients.data.patients.data.map((patient: any) => {
    return {
      id: patient.id,
      fullName: patient.attributes.fullName,
      uid: patient.attributes.uid,
    };
  });

  const doctors = fetchedDoctors.data.doctors.data.map((doctor: any) => {
    return {
      id: doctor.id,
      fullName: doctor.attributes.fullName,
      uid: doctor.attributes.uid,
      specialty: doctor.attributes.specialty,
    };
  });

  const appointments = fetchedAppointments.data.appointments.data.map(
    (appointment: any) => {
      return {
        id: [appointment.id, appointment.attributes.uid],
        patient: [
          appointment.attributes.patient.data.attributes.fullName,
          appointment.attributes.patient.data.attributes.uid,
          appointment.attributes.patient.data.id,
        ],
        generalPurpose: appointment.attributes.generalPurpose,
        doctor: [
          appointment.attributes.doctor.data.attributes.fullName,
          appointment.attributes.doctor.data.attributes.uid,
          appointment.attributes.doctor.data.id,
          appointment.attributes.doctor.data.attributes.meeting_token,
          appointment.attributes.patient.data.attributes.patient_tkn,
        ],
        date: [
          new Date(appointment.attributes.appointmentDate),
          new Date(appointment.attributes.appointmentDate).toDateString(),
          new Date(appointment.attributes.appointmentDate).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          appointment.attributes.appointmentDate,
        ],
        type: appointment.attributes.typeOfVisit,
        notes: appointment.attributes.notes,
        status: appointment.attributes.status,
        condition: appointment.attributes.condition,
        uid: appointment.attributes.uid,
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
              <AdminUserNav />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-y-2 p-8 pt-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the appointments.
            </p>
          </div>
        </div>
        <div className="p-8 pt-2">
          <DataTable
            data={appointments}
            columns={columns}
            doctors={doctors}
            patients={patients}
          />
        </div>
      </div>
    </>
  );
}
