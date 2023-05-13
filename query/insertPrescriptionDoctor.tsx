//insert an appointment into the database using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { uuid } from 'uuidv4';

export const insertPrescriptionDoctor = async (
  appointment_id: string,
  doctor_id: string,
  patient_id: string
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const uid = uuid();

  const { data } = await client.mutate({
    variables: {
      uid: uid,
      appointment_id: appointment_id,
      doctor_id: doctor_id,
      patient_id: patient_id,
    },
    mutation: gql`
      mutation (
        $uid: String!
        $appointment_id: ID!
        $doctor_id: ID!
        $patient_id: ID!
      ) {
        createPrescription(
          data: {
            uid: $uid
            appointment: $appointment_id
            doctor: $doctor_id
            patient: $patient_id
            diagnosis: ""
          }
        ) {
          data {
            id
            attributes {
              uid
            }
          }
        }
      }
    `,
  });

  return data;
};
