import { getPatientData } from "@/app/patient/[patient_id]/utils";
import { getMedicalRecord } from "@/app/patient/[patient_id]/utils";
import {
  getAppointmentPatient,
  getDoctorData,
  getPrescriptionPatient,
} from "../../utils";
import { MainNav } from "@/components/mainNav";
import { DoctorUserNav } from "@/components/doctor-dashboard/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BasicHealthRecord } from "@/components/doctor-patient-profiles/patient-record/basic-health-record";
import { MedicalRecordCard } from "@/components/doctor-patient-profiles/patient-record/medical-record";
import { DataTable as AppTable } from "@/components/doctor-patient-profiles/patient-record/appointment/data-table";
import { DataTable as PresTable } from "@/components/doctor-patient-profiles/patient-record/prescription/data-table";
import { columns as apcol } from "@/components/doctor-patient-profiles/patient-record/appointment/columns";
import { columns as prepcol } from "@/components/doctor-patient-profiles/patient-record/prescription/columns";

interface PageProps {
  params: {
    doctor_id: string;
    patient_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const fetchedDoctor = await getDoctorData(params.doctor_id);
  const doctor = fetchedDoctor.data.doctors.data;
  const id = doctor[0].id;

  const fetchedMedicalRecord = await getMedicalRecord(params.patient_id);
  const medicalRecord = fetchedMedicalRecord.data.medicalRedicords.data[0];

  const fetchedPatient = await getPatientData(params.patient_id);
  const patient = fetchedPatient.data.patients.data[0];

  const fetchedAppointments = await getAppointmentPatient(params.patient_id);
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
          appointment.attributes.patient_tkn,
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

  const fetchedPrescriptions = await getPrescriptionPatient(params.patient_id);
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
        date: [
          new Date(
            prescription.attributes.appointment.data.attributes.appointmentDate
          ),
          new Date(
            prescription.attributes.appointment.data.attributes.appointmentDate
          ).toDateString(),
          new Date(
            prescription.attributes.appointment.data.attributes.appointmentDate
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          prescription.attributes.appointment.data.attributes.appointmentDate,
        ],

        uid: prescription.attributes.uid,
        diagnosis: [
          prescription.attributes.diagnosis,
          prescription.attributes.prescription,
          prescription.attributes.notes,
        ],
      };
    }
  );

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
          <h2 className="text-2xl font-bold tracking-tight">
            {patient.attributes.fullName} Profile
          </h2>
          <p className="text-muted-foreground">
            View all medical data of the patient including his/her appointment,
            prescriptions and basic health information.
          </p>
        </div>
      </div>
      <div className="p-8 pt-2">
        <Tabs defaultValue="Medical Data" className="space-y-4">
          <TabsList>
            <TabsTrigger value="Medical Data">Medical Data</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>
          <TabsContent value="Medical Data" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Basic Health Information</CardTitle>
                  <CardDescription>
                    Please fill in the form below to update your personal
                    information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BasicHealthRecord />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Health Information</CardTitle>
                  <CardDescription>
                    Please fill in the form below to update your health
                    information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MedicalRecordCard record={medicalRecord} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <AppTable data={appointments} columns={apcol} />
          </TabsContent>
          <TabsContent value="prescriptions" className="space-y-4">
            <PresTable
              data={prescriptions}
              columns={prepcol}
              appointments={appointments}
              patient={patient}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
