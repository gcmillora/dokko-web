import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

//using graphql
export const findAllPatients = async (jwtToken: string) => {
  //use graphql
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const { data } = await client.query({
    query: gql`
      query {
        patients {
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
