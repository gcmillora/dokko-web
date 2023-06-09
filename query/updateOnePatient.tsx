import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const updateOnePatient = async (
  patient_id: string,
  jwtToken: string,
  patient: any
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
      id: patient_id,
      fullName: patient.fullName,
      phoneNumber: patient.contact,
      address: patient.address,
    },
    mutation: gql`
      mutation (
        $id: ID!
        $fullName: String!
        $phoneNumber: String!
        $address: String!
      ) {
        updatePatient(
          id: $id
          data: {
            fullName: $fullName
            phoneNumber: $phoneNumber
            address: $address
          }
        ) {
          data {
            id
            attributes {
              uid
              fullName
              email
              address
            }
          }
        }
      }
    `,
  });

  return data;
};
