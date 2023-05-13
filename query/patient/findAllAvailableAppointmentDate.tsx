//find all available appointment dates using graphql for a patient

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findAllAvailableAppointmentDate = async (patient_id: string) => {
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
        appointments(filters: { patient: { uid: { eq: $uid } } }) {
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
        }
      }
    `,
  });
  let allSelectedDates = [];
  for (let i = 0; i < data.appointments.data.length; i++) {
    allSelectedDates.push(data.appointments.data[i].attributes.appointmentDate);
  }
  return allSelectedDates;
};
