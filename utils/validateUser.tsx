//function to check if user is logged in
import { findOneDoctor } from "../query/findOneDoctor";
import { findOnePatient } from "../query/findOnePatient";

export const validateUser = async (type: string, uid: string) => {
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    return false;
  }

  if (type === "doctor" && jwtToken) {
    const doctor = await findOneDoctor(uid);
    if (doctor.doctors.data.length > 0) {
      return true;
    }
  } else if (type === "patient" && jwtToken) {
    const patient = await findOnePatient(uid);
    if (patient.patients.data.length > 0) {
      return true;
    }
  }

  return false;
};
