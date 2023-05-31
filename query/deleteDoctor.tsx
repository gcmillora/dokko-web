import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const DeleteDoctor = async (id: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      id: id,
    },
    mutation: gql`
      mutation ($id: ID!) {
        updateDoctor(id: $id, data: { status: false }) {
          data {
            id
            attributes {
              uid
              fullName
            }
          }
        }
      }
    `,
  });
  return data;
};
