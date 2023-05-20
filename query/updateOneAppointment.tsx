//update an appointment using graphql

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const updateOneAppointment = async (
  appointment_id: string,
  jwtToken: string,
  appointment: any
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const { data } = await client.mutate({
    variables: {
      id: appointment_id,
      condition: appointment.condition,
      generalPurpose: appointment.generalPurpose,
      notes: appointment.notes,
    },
    mutation: gql`
      mutation (
        $id: ID!
        $condition: String
        $generalPurpose: String
        $notes: String
      ) {
        updateAppointment(
          id: $id
          data: {
            condition: $condition
            generalPurpose: $generalPurpose
            notes: $notes
          }
        ) {
          data {
            id
            attributes {
              uid
              patient {
                data {
                  id
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
              generalPurpose
              notes
            }
          }
        }
      }
    `,
  });

  return data;
};

export const MutationUpdateAppointmentByID = `
mutation (
  $id: ID!
  $status: Boolean!
) {
  updateAppointment(
    id: $id
    data: {
      status: $status
    }
  ) {
    data {
      id
      attributes {
        uid
        patient {
          data {
            id
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
        generalPurpose
        notes
      }
    }
  }
}
`;
