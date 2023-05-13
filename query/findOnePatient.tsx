import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

//add error handling for graphql
export const findOnePatient = async (patient_id: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    variables: {
      uid: patient_id,
    },
    query: gql`
      query ($uid: String!) {
        patients(filters: { uid: { eq: $uid } }) {
          data {
            id
            attributes {
              uid
              fullName
              email
              address
              phoneNumber
              profilepicture {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
              medical_redicord {
                data {
                  id
                  attributes {
                    uid
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
