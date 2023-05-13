//find one medical record using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findOneMedicalRecord = async (medical_id: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    variables: {
      uid: medical_id,
    },
    query: gql`
      query ($uid: String!) {
        medicalRedicords(filters: { uid: { eq: $uid } }) {
          data {
            id
            attributes {
              uid
              sex
              height
              weight
              bloodtype
              allergies
              birthdate
            }
          }
        }
      }
    `,
  });

  return data;
};
