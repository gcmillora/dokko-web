import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const DeleteUser = async (id: string) => {
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
        deleteUsersPermissionsUser(id: $id) {
          data {
            id
            attributes {
              uid
              email
            }
          }
        }
      }
    `,
  });
  return data;
};
