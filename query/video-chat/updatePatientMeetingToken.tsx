import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const updatePatientMeetingToken = async (
  token: string,
  appointmentID: string
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      id: appointmentID,
      meeting_token: token,
    },
    mutation: gql`
      mutation ($id: ID!, $meeting_token: String!) {
        updateAppointment(id: $id, data: { patient_tkn: $meeting_token }) {
          data {
            id
            attributes {
              uid
              patient_tkn
            }
          }
        }
      }
    `,
  });

  return data;
};
