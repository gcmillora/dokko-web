import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { uuid } from "uuidv4";

export const insertConversation = async (
  subject: string,
  patientID: string,
  doctorID: string,
  messageID: string
) => {
  const uid = uuid();
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      subject: subject,
      patientID: patientID,
      doctorID: doctorID,
      messageID: messageID,
      uid: uid,
    },
    mutation: gql`
      mutation (
        $subject: String!
        $patientID: ID!
        $doctorID: ID!
        $messageID: ID
        $uid: String!
      ) {
        createConversation(
          data: {
            subject: $subject
            patient: $patientID
            doctor: $doctorID
            messages: [$messageID]
            uid: $uid
          }
        ) {
          data {
            id
            attributes {
              subject
            }
          }
        }
      }
    `,
  });
  return data;
};
