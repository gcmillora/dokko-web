import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

//using graphql
export const findDoctors = async (jwtToken: string, selected: string) => {
  //use graphql
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const { data } = await client.query({
    variables: {
      specialty: selected,
    },
    query: gql`
      query ($specialty: String!) {
        doctors(filters: { specialty: { eq: $specialty } }) {
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
