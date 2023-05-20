import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { UserNavPatient } from "@/components/patient-dashboard/user-nav";
import { columns } from "@/components/patient-appointment-table/columns";

import { MainNav } from "@/components/mainNav";
import {
  findAllAppointments,
  patientAppointmentsQuery,
} from "@/query/patient/findAllAppointmentsByPatients";
import { useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { DataTable } from "@/components/patient-appointment-table/data-table";
import { findAllDoctorQuery } from "@/query/findDoctors";
import { getPatientData } from "../utils";

// Simulate a database read for tasks.

interface pageProps {
  params: { patient_id: string };
}

export const metadata: Metadata = {
  title: "Appointments | Dokko",
  description: "Appointments",
};
async function getData(patientid: string) {
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
      query: patientAppointmentsQuery,
      variables: {
        uid: patientid,
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
  const data = await getData(params.patient_id);
  const fetchedDoctors = await getDoctors();
  const fetchedPatient = await getPatientData(params.patient_id);
  const patient = fetchedPatient.data.patients.data;
  const id = patient[0].id;

  const doctors = fetchedDoctors?.data?.doctors?.data?.map((doctor: any) => {
    return {
      id: doctor.id,
      fullName: doctor.attributes.fullName,
      uid: doctor.attributes.uid,
      specialty: doctor.attributes.specialty,
    };
  });

  const appointments = data.data.appointments.data.map((appointment: any) => {
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
  });

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
              <UserNavPatient id={id} type={"patient"} patient={patient} />
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
          <DataTable data={appointments} columns={columns} doctors={doctors} />
        </div>
      </div>
    </>
  );
}
