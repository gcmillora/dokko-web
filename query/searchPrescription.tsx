//search prescription through appointment id using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const searchPrescription = async (appointment_id: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    variables: {
      uid: appointment_id,
    },
    query: gql`
      query ($uid: String!) {
        prescriptions(filters: { appointment: { uid: { eq: $uid } } }) {
          data {
            id
          }
        }
      }
    `,
  });

  return data;
};
