"use client";
import { DoctorUserNav } from "@/components/doctor-dashboard/user-nav";
import { MainNav } from "@/components/mainNav";
import { getDoctorData, getPatients } from "../utils";
import PatientProfiles from "@/components/doctor-patient-profiles/patient-profiles";

interface pageProps {
  params: { doctor_id: string };
}
export default async function Page({ params }: pageProps) {
  const fetchedDoctor = await getDoctorData(params.doctor_id);
  const doctor = fetchedDoctor.data.doctors.data;

  const fetchedPatients = await getPatients();
  const patients = fetchedPatients.data.patients.data
    .filter((patient: any) => {
      return patient.attributes.status === true;
    })
    .map((patient: any) => {
      return {
        id: [patient.id, patient.attributes.uid],
        fullName: patient.attributes.fullName,
        uid: patient.attributes.uid,
        email: patient.attributes.email,
        phoneNumber: patient.attributes.phoneNumber,
        address: patient.attributes.address,
      };
    });
  const id = doctor.id;
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav
            className="mx-6"
            {...{ id: params.doctor_id, type: "doctor" }}
          />
          <div className="ml-auto flex items-center space-x-4">
            <DoctorUserNav id={id} type="doctor" doctor={doctor} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between space-y-2 p-8 pt-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
          <p className="text-muted-foreground">Find a patient in this page.</p>
        </div>
      </div>

      <PatientProfiles patients={patients} />
    </div>
  );
}
