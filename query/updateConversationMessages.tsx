import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const updateConversationMessages = async (
  messagesID: any[],
  conversationID: string
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      messagesID: messagesID,
      conversationID: conversationID,
    },
    mutation: gql`
      mutation ($messagesID: [ID]!, $conversationID: ID!) {
        updateConversation(
          data: { messages: $messagesID }
          id: $conversationID
        ) {
          data {
            id
            attributes {
              messages {
                data {
                  id
                  attributes {
                    payload
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
