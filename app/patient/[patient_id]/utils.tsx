import { findAllDoctorQuery } from "@/query/findDoctors";
import { QueryOnePatient } from "@/query/findOnePatient";
import { QueryConversationsPatient } from "@/query/patient/findAllConversationsPatient";

export async function getPatientData(patientid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 20,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryOnePatient,
      variables: {
        uid: patientid,
      },
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function getConversations(patientid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 20,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryConversationsPatient,
      variables: {
        uid: patientid,
      },
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function getDoctors() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 20,
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
