import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const findAllConversationsDoctor = async (
  doctor_id: string,
  jwtToken: string
) => {
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
        conversations(
          filters: { doctor: { uid: { eq: $uid } } }
          sort: "createdAt:desc"
        ) {
          data {
            id
            attributes {
              doctor {
                data {
                  id
                  attributes {
                    fullName
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
              patient {
                data {
                  id
                  attributes {
                    fullName
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
              messages {
                data {
                  id
                  attributes {
                    sender_name
                    recipient_name
                    payload
                    uid
                    createdAt
                  }
                }
              }
              createdAt
              subject
            }
          }
          meta {
            pagination {
              total
            }
          }
        }
      }
    `,
  });
  return data;
};
