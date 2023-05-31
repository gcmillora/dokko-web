import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const DeletePatientAppointment = async (appointmentId: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.mutate({
    variables: {
      id: appointmentId,
    },
    mutation: gql`
      mutation ($id: ID!) {
        deleteAppointment(id: $id) {
          data {
            id
            attributes {
              uid
              appointmentDate
            }
          }
        }
      }
    `,
  });

  return data;
};
