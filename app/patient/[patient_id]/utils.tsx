import { QueryOnePatient } from "@/query/findOnePatient";

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
