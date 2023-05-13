import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { uuid } from 'uuidv4';

export const insertOneMessage = async (
  payload: string,
  sender_name: string,
  recipient_name: string,
  sender_uid: string,
  recipient_uid: string,
  jwtToken: string
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const uid = uuid();

  const { data } = await client.mutate({
    variables: {
      payload: payload,
      uid: uid,
      sender_name: sender_name,
      recipient_name: recipient_name,
      sender_uid: sender_uid,
      recipient_uid: recipient_uid,
    },
    mutation: gql`
      mutation (
        $payload: String!
        $uid: String!
        $sender_name: String!
        $recipient_name: String!
        $sender_uid: String!
        $recipient_uid: String!
      ) {
        createMessage(
          data: {
            payload: $payload
            uid: $uid
            sender_name: $sender_name
            recipient_name: $recipient_name
            sender_uid: $sender_uid
            recipient_uid: $recipient_uid
          }
        ) {
          data {
            id
            attributes {
              payload
              uid
              sender_name
              recipient_name
              sender_uid
              recipient_uid
            }
          }
        }
      }
    `,
  });
  return data;
};
