import { QueryAllAppointmentsDoctor } from "@/query/doctor/findAllAppointmentsByDoctor";
import { QueryConversationsDoctor } from "@/query/doctor/findAllConversationsDoctor";
import { QueryAllPrescriptionsDoctor } from "@/query/doctor/findAllPrescriptionsByDoctor";
import { QueryAllPatients } from "@/query/findAllPatients";
import { QueryOneDoctor } from "@/query/findOneDoctor";
import { patientAppointmentsQuery } from "@/query/patient/findAllAppointmentsByPatients";
import { patientPrescriptionsQuery } from "@/query/patient/findAllPrescriptionsByPatient";

export async function getDoctorData(doctorid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryOneDoctor,
      variables: {
        uid: doctorid,
      },
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}
export async function getAppointments(doctorid: string) {
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

export async function getPrescriptions(doctorid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryAllPrescriptionsDoctor,
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

export async function getConversations(doctorid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryConversationsDoctor,
      variables: {
        uid: doctorid,
      },
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function getPatients() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 5,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryAllPatients,
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function getAppointmentPatient(patientid: string) {
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

export async function getPrescriptionPatient(patientid: string) {
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
