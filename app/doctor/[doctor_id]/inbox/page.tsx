import { Inbox } from "@/components/inboxDoctor/inbox";
import { MainNav } from "@/components/mainNav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { getConversations, getPatients, getDoctorData } from "../utils";
import { UserNavPatient } from "@/components/patient-dashboard/user-nav";
import { UserNav } from "@/components/user-nav";

interface pageProps {
  params: { doctor_id: string };
}
export default async function Page({ params }: pageProps) {
  const fetchedConversations = await getConversations(params.doctor_id);
  const conversations = fetchedConversations.data.conversations.data;
  const fetchedPatients = await getPatients();
  const patients = fetchedPatients.data.patients.data;

  const fetchedDoctor = await getDoctorData(params.doctor_id);
  const doctor = fetchedDoctor.data.doctors.data;
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
            <UserNav id={id} type={"doctor"} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Inbox conversations={conversations} patients={patients} />
        </div>
      </div>
    </div>
  );
}
