import { Inbox } from "@/components/patient-inbox/inbox";
import { MainNav } from "@/components/mainNav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { getConversations, getDoctors, getPatientData } from "../utils";
import { UserNavPatient } from "@/components/patient-dashboard/user-nav";
import { Metadata } from "next";

interface pageProps {
  params: { patient_id: string };
}
export const metadata: Metadata = {
  title: "Inbox | Dokko",
  description: "Inbox",
};
export default async function Page({ params }: pageProps) {
  const fetchedConversations = await getConversations(params.patient_id);
  const conversations = fetchedConversations.data.conversations.data;
  const fetchedDoctors = await getDoctors();
  const doctors = fetchedDoctors.data.doctors.data.filter((doctor: any) => {
    return doctor.attributes.status === true;
  });

  const fetchedPatient = await getPatientData(params.patient_id);
  const patient = fetchedPatient.data.patients.data.filter((patient: any) => {
    return patient.attributes.status === true;
  });
  const id = patient[0].id;

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav
            className="mx-6"
            {...{ id: params.patient_id, type: "patient" }}
          />
          <div className="ml-auto flex items-center space-x-4">
            <UserNavPatient id={id} type={"patient"} patient={patient} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Inbox conversations={conversations} doctors={doctors} />
        </div>
      </div>
    </div>
  );
}
