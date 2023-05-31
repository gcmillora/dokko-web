import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { UserNav } from "@/components/user-nav";
import { columns } from "@/components/doctor-appointments-table/columns";

import { MainNav } from "@/components/mainNav";
import {
  findAllAppointments,
  patientAppointmentsQuery,
} from "@/query/patient/findAllAppointmentsByPatients";
import { useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { DataTable } from "@/components/doctor-appointments-table/data-table";
import { findAllDoctorQuery } from "@/query/findDoctors";
import { QueryAllAppointmentsDoctor } from "@/query/doctor/findAllAppointmentsByDoctor";
import { DoctorUserNav } from "@/components/doctor-dashboard/user-nav";
import { getDoctorData } from "../utils";

// Simulate a database read for tasks.

interface pageProps {
  params: { doctor_id: string };
}

export const metadata: Metadata = {
  title: "Appointments | Dokko",
  description: "Appointments",
};
async function getData(doctorid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: QueryAllAppointmentsDoctor,
      variables: {
        uid: doctorid,
      },
    }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("error");
  }
  return res.json();
}

async function getDoctors() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: findAllDoctorQuery,
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export default async function Page({ params }: pageProps) {
  const data = await getData(params.doctor_id);

  const appointments = data.data.appointments.data.map((appointment: any) => {
    return {
      id: [appointment.id, appointment.attributes.uid],
      patient: [
        appointment.attributes.patient.data.attributes.fullName,
        appointment.attributes.patient.data.attributes.uid,
        appointment.attributes.patient.data.id,
        appointment.attributes.doctor.data.attributes.uid,
        appointment.attributes.doctor.data.attributes.meeting_token,
      ],
      generalPurpose: appointment.attributes.generalPurpose,
      doctor: [
        appointment.attributes.doctor.data.attributes.fullName,
        appointment.attributes.doctor.data.attributes.uid,
        appointment.attributes.doctor.data.id,
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
  });
  const fetchedDoctor = await getDoctorData(params.doctor_id);
  const doctor = fetchedDoctor.data.doctors.data;
  const id = doctor[0].id;
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
        <div className="flex items-center justify-between space-y-2 p-8 pt-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all your appointments.
            </p>
          </div>
        </div>
        <div className="p-8 pt-2">
          <DataTable data={appointments} columns={columns} />
        </div>
      </div>
    </>
  );
}
