//update prescription using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const updateOnePrescription = async (
  diagnosis: string,
  prescription: string,
  prescription_id: string,
  notes: string
) => {
  //use error policy : all
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      id: prescription_id,
      diagnosis: diagnosis,
      prescription: prescription,
      notes: notes,
    },
    mutation: gql`
      mutation (
        $id: ID!
        $diagnosis: String!
        $prescription: String!
        $notes: String!
      ) {
        updatePrescription(
          id: $id
          data: {
            diagnosis: $diagnosis
            prescription: $prescription
            notes: $notes
          }
        ) {
          data {
            id
            attributes {
              uid
              diagnosis
              prescription
              notes
            }
          }
        }
      }
    `,
  });

  return data;
};
