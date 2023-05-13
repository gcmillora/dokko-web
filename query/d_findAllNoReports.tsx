//find all appointments of a doctor with pagination using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const d_findAllNoReports = async (
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
        appointments(
          filters: {
            doctor: { uid: { eq: $uid } }
            report_generated: { eq: false }
            active: { eq: true }
            status: { eq: true }
          }
        ) {
          data {
            id
            attributes {
              uid
              doctor {
                data {
                  id
                  attributes {
                    uid
                    fullName
                  }
                }
              }
              patient {
                data {
                  id
                  attributes {
                    uid
                    fullName
                  }
                }
              }
              appointmentDate
              typeOfVisit
              active
              condition
              report_generated
              generalPurpose
            }
          }
        }
      }
    `,
  });

  return data;
};
