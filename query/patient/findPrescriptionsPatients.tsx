// Description: This file is used to find prescriptions for a patient for dashboard
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findPrescriptions = async (patient_id: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    variables: {
      uid: patient_id,
    },
    query: gql`
      query ($uid: String!) {
        prescriptions(
          filters: { patient: { uid: { eq: $uid } } }
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
                    specialty
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return data;
};
