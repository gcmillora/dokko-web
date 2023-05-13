import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const updateOneConversation = async (
  messagesIDs: [],
  jwtToken: string,
  conversationID: string
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
      id: conversationID,
      messages: messagesIDs,
    },
    mutation: gql`
      mutation ($id: ID!, $messages: [ID!]) {
        updateConversation(id: $id, data: { messages: $messages }) {
          data {
            id
            attributes {
              messages {
                data {
                  id
                  attributes {
                    payload
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
