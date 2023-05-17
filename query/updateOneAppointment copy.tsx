//update an appointment using graphql

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const updateOneAppointmentById = async (
  appointment_id: string,
  jwtToken: string,
  status: boolean
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
      status: status,
    },
    mutation: gql`
      mutation ($id: ID!, $status: Boolean!) {
        updateAppointment(id: $id, data: { status: $status }) {
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
