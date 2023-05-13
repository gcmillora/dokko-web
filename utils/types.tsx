export type Patient = {
  profilepicture: any;
  uid: string;
  fullName: string;
  email: string;
  address: string;
  status: string;
};

export type Doctor = {
  uid: string;
  fullName: string;
  email: string;
  address: string;
  contact: string;
  status: string;
  specialization: string;
};

export type Appointment = {
  uid: string;
  patient: {};
  doctor: {};
  appointmentDate: string;
  typeOfVisit: string;
  status: string;
  notes: string;
};

export type CreatePatientInput = {
  fullName: String;
  email: String;
  address: String;
  status: Boolean;
};

export type Prescription = {
  uid: string;
  patient: {};
  doctor: {};
  appointment: {};
  prescription: string;
  status: boolean;
};

export type CreateDoctorInput = {
  fullName: String;
  email: String;
  medicalId: String;
  status: Boolean;
  specialty: String;
};

export enum DoctorSpecialization {
  Dentist = 'Dentist',
  Dermatologist = 'Dermatologist',
  Gastroenterologist = 'Gastroenterologist',
  General_Practitioner = 'General Practitioner',
  Neurologist = 'Neurologist',
  Obstetrician = 'Obstetrician',
  Ophthalmologist = 'Ophthalmologist',
  Orthopedic_Surgeon = 'Orthopedic Surgeon',
  Pediatrician = 'Pediatrician',
  Psychiatrist = 'Psychiatrist',
  Surgeon = 'Surgeon',
}
