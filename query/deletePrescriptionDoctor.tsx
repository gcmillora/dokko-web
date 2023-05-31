import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const DeleteDoctorPrescription = async (prescriptionId: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      id: prescriptionId,
    },
    mutation: gql`
      mutation ($id: ID!) {
        deletePrescription(id: $id) {
          data {
            id
            attributes {
              uid
              diagnosis
            }
          }
        }
      }
    `,
  });

  return data;
};
