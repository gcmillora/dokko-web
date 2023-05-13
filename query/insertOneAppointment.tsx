import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { uuid } from 'uuidv4';

export const insertOneAppointment = async (
  jwtToken: string,
  patient_id: string,
  doctor_id: string,
  appointmentDate: Date,
  typeOfVisit: string,
  condition: string,
  notes: string,
  generalPurpose: string
) => {
  const uid = uuid();
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const { data } = await client.mutate({
    variables: {
      patient_id: patient_id,
      doctor_id: doctor_id,
      appointmentDate: appointmentDate,
      typeOfVisit: typeOfVisit,
      condition: condition,
      notes: notes,
      generalPurpose: generalPurpose,
      uid: uid,
    },
    mutation: gql`
      mutation (
        $patient_id: ID!
        $doctor_id: ID!
        $appointmentDate: DateTime!
        $typeOfVisit: String!
        $condition: String!
        $uid: String!
        $notes: String
        $generalPurpose: String!
      ) {
        createAppointment(
          data: {
            patient: $patient_id
            doctor: $doctor_id
            appointmentDate: $appointmentDate
            typeOfVisit: $typeOfVisit
            condition: $condition
            uid: $uid
            notes: $notes
            generalPurpose: $generalPurpose
            report_generated: false
            status: false
          }
        ) {
          data {
            id
            attributes {
              uid
              patient {
                data {
                  attributes {
                    uid
                    fullName
                  }
                }
              }
              doctor {
                data {
                  attributes {
                    uid
                    fullName
                  }
                }
              }
              appointmentDate
              typeOfVisit
              status
              condition
            }
          }
        }
      }
    `,
  });

  return data;
};
