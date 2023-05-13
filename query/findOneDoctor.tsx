//find one doctor using graphql

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findOneDoctor = async (doctor_id: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    variables: {
      uid: doctor_id,
    },
    query: gql`
      query ($uid: String!) {
        doctors(filters: { uid: { eq: $uid } }) {
          data {
            id
            attributes {
              address
              uid
              fullName
              email
              meeting_token
              profilepicture {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  return data;
};
