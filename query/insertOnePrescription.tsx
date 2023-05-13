//insert a prescription into the database using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { uuid } from 'uuidv4';

export const insertOnePrescription = async (
  jwtToken: string,
  patient_id: string,
  doctor_id: string,
  prescription: string,
  status: boolean,
  appointment_id: string,
  notes: string,
  diagnosis: string
) => {
  const uid = uuid();
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      uid: uid,
      patient_id: patient_id,
      doctor_id: doctor_id,
      prescription: prescription,
      status: status,
      appointment_id: appointment_id,
      notes: notes,
      diagnosis: diagnosis,
    },
    mutation: gql`
      mutation (
        $uid: String!
        $patient_id: ID!
        $doctor_id: ID!
        $prescription: String!
        $status: Boolean!
        $appointment_id: ID!
        $notes: String
        $diagnosis: String
      ) {
        createPrescription(
          data: {
            uid: $uid
            patient: $patient_id
            doctor: $doctor_id
            prescription: $prescription
            status: $status
            appointment: $appointment_id
            notes: $notes
            diagnosis: $diagnosis
          }
        ) {
          data {
            id
            attributes {
              uid
              prescription
              status
              notes
            }
          }
        }
      }
    `,
  });

  return data;
};
