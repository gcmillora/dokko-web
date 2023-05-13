//find one appointment using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findOneAppointment = async (
  appointment_id: string,
  jwtToken: string
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const { data } = await client.query({
    variables: {
      uid: appointment_id,
    },
    query: gql`
      query ($uid: String!) {
        appointments(filters: { uid: { eq: $uid } }) {
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
                    meeting_token
                  }
                }
              }
              doctor {
                data {
                  id
                  attributes {
                    uid
                    fullName
                    meeting_token
                  }
                }
              }
              appointmentDate
              typeOfVisit
              status
              active
              condition
              generalPurpose
              notes
              patient_tkn
            }
          }
        }
      }
    `,
  });

  return data;
};
