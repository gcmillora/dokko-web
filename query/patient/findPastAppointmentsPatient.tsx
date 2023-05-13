import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findPastAppointments = async (patient_id: string) => {
  const today = new Date();
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    variables: {
      uid: patient_id,
    },
    //query just 5 fields from the appointments table
    query: gql`
      query ($uid: String!) {
        appointments(filters: { patient: { uid: { eq: $uid } }, appointmentDate: { lt: "${today.toISOString()}"}}, pagination: { limit: 5 }) {
          data {
            id
            attributes {
              uid
              patient {
                data {
                  attributes {
                    uid
                    fullName
                  }
                }
              }
              doctor {
                data {
                  attributes {
                    uid
                    fullName
                    specialty
                  }
                }
              }
              appointmentDate
              typeOfVisit
              status
              condition
            }
          }
          
        }
      }
    `,
  });
  return data;
};
