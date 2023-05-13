//find all appointments with pagination using graphql for a patient

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findAllAppointments = async (patient_id: string, page: number) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    variables: {
      uid: patient_id,
      page: page,
    },
    query: gql`
      query ($uid: String!, $page: Int!) {
        appointments(
          filters: { patient: { uid: { eq: $uid } } }
          pagination: { page: $page, pageSize: 8 }
          sort: "appointmentDate:desc"
        ) {
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
                  }
                }
              }
              appointmentDate
              typeOfVisit
              status
              condition
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
