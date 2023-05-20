import { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
  BookmarkPlus,
  Files,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { patientAppointmentsQuery } from "@/query/patient/findAllAppointmentsByPatients";
import { RecentAppointments } from "@/components/patient-dashboard/recent-apps";
import { Overview } from "@/components/overview";
import { doctorDefaultPhoto, patientDefaultPhoto } from "@/utils/exports";
import { patientPrescriptionsQuery } from "@/query/patient/findAllPrescriptionsByPatient";
import { QueryAllAppointmentsDoctor } from "@/query/doctor/findAllAppointmentsByDoctor";
import { RecentAppointmentsDoctor } from "@/components/doctor-dashboard/recent-apps";
import { QueryAllPrescriptionsDoctor } from "@/query/doctor/findAllPrescriptionsByDoctor";
import { QueryOneDoctor } from "@/query/findOneDoctor";
import { getAppointments, getDoctorData, getPrescriptions } from "./utils";
import { DoctorUserNav } from "@/components/doctor-dashboard/user-nav";
import { VirtualRoom } from "@/components/doctor-dashboard/virtual-room";

export const metadata: Metadata = {
  title: "Dashboard | Dokko",
  description: "Example dashboard app using the components.",
};

interface pageProps {
  params: { doctor_id: string };
}

export default async function DashboardPage({ params }: pageProps) {
  const fetchedAppointments = await getAppointments(params.doctor_id);
  const fetchedPrescriptions = await getPrescriptions(params.doctor_id);
  const fetchedDoctor = await getDoctorData(params.doctor_id);
  const doctor = fetchedDoctor.data.doctors.data;
  const id = doctor[0].id;

  const prescriptions = fetchedPrescriptions.data.prescriptions;
  const appointments = fetchedAppointments.data.appointments;
  //only get five recent appointments
  const recentApps: [any] = appointments.data
    .map((appointment: any) => {
      return {
        id: appointment.id,
        patient: appointment.attributes.patient.data.attributes.fullName,
        doctor: appointment.attributes.doctor.data.attributes.fullName,
        doctorLink:
          appointment?.attributes?.doctor?.data?.attributes?.profilepicture
            ?.data?.attributes?.url || doctorDefaultPhoto,
        patientLink:
          appointment?.attributes?.patient?.data?.attributes?.profilepicture
            ?.data?.attributes?.url || patientDefaultPhoto,
        date: appointment.attributes.appointmentDate,
        condition: appointment.attributes.condition,
        type: appointment.attributes.typeOfVisit,
        status: appointment.attributes.status,
        generalPurpose: appointment.attributes.generalPurpose,
      };
    })
    .slice(0, 5);

  let dataAppsPerMonth = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 0 },
    { name: "Aug", value: 0 },
    { name: "Sep", value: 0 },
    { name: "Oct", value: 0 },
    { name: "Nov", value: 0 },
    { name: "Dec", value: 0 },
  ];

  //recent apps to per month
  const recentAppsPerMont = recentApps.map((appointment: any) => {
    const dte = new Date(appointment.date);
    const month = dte.toLocaleString("default", { month: "long" });
    if (month === "January") {
      dataAppsPerMonth[0].value += 1;
    }
    if (month === "February") {
      dataAppsPerMonth[1].value += 1;
    }
    if (month === "March") {
      dataAppsPerMonth[2].value += 1;
    }
    if (month === "April") {
      dataAppsPerMonth[3].value += 1;
    }
    if (month === "May") {
      dataAppsPerMonth[4].value += 1;
    }
    if (month === "June") {
      dataAppsPerMonth[5].value += 1;
    }
    if (month === "July") {
      dataAppsPerMonth[6].value += 1;
    }
    if (month === "August") {
      dataAppsPerMonth[7].value += 1;
    }
    if (month === "September") {
      dataAppsPerMonth[8].value += 1;
    }
    if (month === "October") {
      dataAppsPerMonth[9].value += 1;
    }
    if (month === "November") {
      dataAppsPerMonth[10].value += 1;
    }
    if (month === "December") {
      dataAppsPerMonth[11].value += 1;
    }
  });

  return (
    <>
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

        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <VirtualRoom doctor={doctor} />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments" disabled>
                Appointments
              </TabsTrigger>
              <TabsTrigger value="prescriptions" disabled>
                Prescriptions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Appointments
                    </CardTitle>
                    <BookmarkPlus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {appointments.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Proceed to view all appointments
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Prescriptions
                    </CardTitle>
                    <Files className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {prescriptions.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Proceed to view all prescriptions
                    </p>
                  </CardContent>
                </Card>
                <Card></Card>
                <Card></Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={dataAppsPerMonth} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                    <CardDescription>
                      You have made {appointments.data.length} appointments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentAppointmentsDoctor data={recentApps} />
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
