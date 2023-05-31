import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { UserNavPatient } from "@/components/patient-dashboard/user-nav";

import { MainNav } from "@/components/mainNav";
import {
  findAllAppointments,
  patientAppointmentsQuery,
} from "@/query/patient/findAllAppointmentsByPatients";
import { useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";

import { findAllDoctorQuery } from "@/query/findDoctors";
import { patientPrescriptionsQuery } from "@/query/patient/findAllPrescriptionsByPatient";
import { DataTable } from "@/components/patient-prescription-table/data-table";
import { columns } from "@/components/patient-prescription-table/columns";
import { getPatientData } from "../utils";

// Simulate a database read for tasks.

interface pageProps {
  params: { patient_id: string };
}

export const metadata: Metadata = {
  title: "Prescriptions | Dokko",
  description: "Prescriptions",
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
      query: patientPrescriptionsQuery,
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

export default async function Page({ params }: pageProps) {
  const data = await getData(params.patient_id);
  const fetchedPatient = await getPatientData(params.patient_id);
  const patient = fetchedPatient.data.patients.data;
  const id = patient[0].id;

  const prescriptions = data.data.prescriptions.data.map(
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
            <h2 className="text-2xl font-bold tracking-tight">Prescriptions</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all your prescriptions.
            </p>
          </div>
        </div>
        <div className="p-8 pt-2">
          <DataTable data={prescriptions} columns={columns} />
        </div>
      </div>
    </>
  );
}
