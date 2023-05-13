//find past prescriptions of doctor using graphql limit 5

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findPastPrescriptionsDoctor = async (
  doctor_id: string,
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
      uid: doctor_id,
    },
    query: gql`
      query ($uid: String!) {
        prescriptions(
          filters: { doctor: { uid: { eq: $uid } } }
          pagination: { limit: 5 }
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
              appointment {
                data {
                  attributes {
                    uid
                    appointmentDate
                    condition
                    typeOfVisit
                  }
                }
              }
              prescription
            }
          }
        }
      }
    `,
  });

  return data;
};
