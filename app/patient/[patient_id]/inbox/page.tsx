import { Inbox } from "@/components/inboxPatients/inbox";
import { MainNav } from "@/components/mainNav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface pageProps {
  params: { patient_id: string };
}
export default async function Page({ params }: pageProps) {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav
            className="mx-6"
            {...{ id: params.patient_id, type: "patient" }}
          />
          <div className="ml-auto flex items-center space-x-4">
            {/* <UserNav id={id} type={"patient"} /> */}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Inbox />
        </div>
      </div>
    </div>
  );
}
