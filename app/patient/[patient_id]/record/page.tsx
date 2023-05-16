import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/mainNav";
import { UserNav } from "@/components/user-nav";
import { BookmarkPlus, Files } from "lucide-react";
import { BasicHealthRecord } from "@/components/patient-record/basic-health-record";
import { MedicalRecordCard } from "@/components/patient-record/medical-record";
import { Metadata } from "next/types";

interface pageProps {
  params: { patient_id: string };
}
export const metadata: Metadata = {
  title: "Records | Dokko",
  description: "Records",
};
export default async function RecordPage({ params }: pageProps) {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav
              className="mx-6"
              {...{ id: params.patient_id, type: "patient" }}
            />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Medical Record Settings
            </h2>
          </div>
          <Tabs defaultValue="medical" className="space-y-4">
            <TabsList>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="upload" disabled>
                Upload
              </TabsTrigger>
              <TabsTrigger value="general" disabled>
                General
              </TabsTrigger>
            </TabsList>
            <TabsContent value="medical" className="space-y-4">
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
                    <MedicalRecordCard />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
