import { MainNav } from "@/components/mainNav";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkPlus, Files, User } from "lucide-react";
import {
  getAllAppointments,
  getAllDoctors,
  getAllPatients,
  getAllPrescriptions,
} from "../utils";
import { Overview } from "@/components/overview";
import { doctorDefaultPhoto } from "@/utils/exports";
import { OverviewPie } from "@/components/overview-pie";
import { AdminUserNav } from "@/components/admin-dashboard/user-nav";

interface pageProps {
  params: { admin_id: string };
}
export default async function Page({ params }: pageProps) {
  const fetchedAppointments = await getAllAppointments();
  const appointments = fetchedAppointments.data.appointments;

  const fetchedPatients = await getAllPatients();
  const patients = fetchedPatients.data.patients;

  const fetchedDoctors = await getAllDoctors();
  const doctors = fetchedDoctors.data.doctors;

  const fetchedPrescriptions = await getAllPrescriptions();
  const prescriptions = fetchedPrescriptions.data.prescriptions;

  const recentApps: [any] = appointments.data
    .map((appointment: any) => {
      return {
        id: appointment.id,
        patient: appointment.attributes.patient.data.attributes.fullName,
        doctor: appointment.attributes.doctor.data.attributes.fullName,
        patientID: appointment.attributes.patient.data.id,
        doctorLink:
          appointment?.attributes?.doctor?.data?.attributes?.profilepicture
            ?.data?.attributes?.url || doctorDefaultPhoto,
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

  let dataPie = [
    { name: "Doctors", value: patients.data.length },
    { name: "Patients", value: doctors.data.length },
  ];

  //recent apps to per month
  const recentAppsPerMont = appointments.data.map((appointment: any) => {
    const dte = new Date(appointment.attributes.appointmentDate);
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
              {...{ id: params.admin_id, type: "admin" }}
            />
            <div className="ml-auto flex items-center space-x-4">
              <AdminUserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
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
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Patients
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {patients.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Proceed to view all patients
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Doctors
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {doctors.data.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Proceed to view all doctors
                    </p>
                  </CardContent>
                </Card>
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
                    <CardTitle>Total Clinic Members</CardTitle>
                    <CardDescription>
                      Total number of doctors and patients in the clinic.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OverviewPie data={dataPie} />
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
