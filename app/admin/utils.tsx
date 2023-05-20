import {
  QueryAllAppointments,
  QueryAllDoctors,
  QueryAllPatients,
  QueryAllPrescriptions,
  QueryUser,
} from "@/query/admin/get_func";
import { DeletePatientData, DeleteUserData } from "@/query/admin/mutation_func";

export async function getAllAppointments() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryAllAppointments,
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function getAllPrescriptions() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryAllPrescriptions,
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function getAllDoctors() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 60,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryAllDoctors,
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function getAllPatients() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 60,
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

export async function getUserData(uid: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    next: {
      revalidate: 60,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QueryUser,
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

export async function deletePatientData(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mutation: DeletePatientData,
      variables: {
        id: id,
      },
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}

export async function deleteUserData(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mutation: DeleteUserData,
      variables: {
        id: id,
      },
    }),
  });

  if (!res.ok) {
    console.log("error");
  }
  return res.json();
}
