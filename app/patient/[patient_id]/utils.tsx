import { findAllDoctorQuery } from "@/query/findDoctors";
import { QueryOneMedicalRecord } from "@/query/findOneMedicalRecord";
import { QueryOnePatient } from "@/query/findOnePatient";
import { QueryConversationsPatient } from "@/query/patient/findAllConversationsPatient";

export async function getPatientData(patientid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
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
      revalidate: 5,
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

export async function getMedicalRecord(uid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryOneMedicalRecord,
      variables: {
        uid: uid,
      },
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}
