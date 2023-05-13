//update a medical record using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const updateMedicalRecord = async (medical: any) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      id: medical.id,
      sex: medical.sex,
      height: medical.height,
      weight: medical.weight,
      bloodtype: medical.bloodtype,
      allergies: medical.allergies,
      birthdate: medical.birthdate,
    },
    mutation: gql`
      mutation (
        $id: ID!
        $sex: String!
        $height: Int!
        $weight: Int!
        $bloodtype: String!
        $allergies: String!
      ) {
        updateMedicalRedicord(
          id: $id
          data: {
            sex: $sex
            height: $height
            weight: $weight
            bloodtype: $bloodtype
            allergies: $allergies
          }
        ) {
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
