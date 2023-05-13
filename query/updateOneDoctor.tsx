import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const updateOneDoctor = async (
  doctor_id: string,
  jwtToken: string,
  doctor: any
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
      id: doctor_id,
      fullName: doctor.fullName,
      email: doctor.email,
      address: doctor.address,
    },
    mutation: gql`
      mutation (
        $id: ID!
        $fullName: String!
        $email: String!
        $address: String!
      ) {
        updateDoctor(
          id: $id
          data: { fullName: $fullName, email: $email, address: $address }
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
