//find all appointments with pagination using graphql for a patient

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const findAllAppointments = async (patient_id: string) => {
  const client = new ApolloClient({
    ssrMode: true,
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    variables: {
      uid: patient_id,
    },
    query: gql`
      query ($uid: String!) {
        appointments(
          filters: { patient: { uid: { eq: $uid } } }
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
              notes
            }
          }
        }
      }
    `,
  });

  return data;
};

export const patientAppointmentsQuery = `query ($uid: String!) {
  appointments(
    filters: { patient: { uid: { eq: $uid } } }
    sort: "appointmentDate:desc"
  ) {
    data {
      id
      attributes {
        uid
        patient {
          data {
            id
            attributes {
              uid
              fullName
              profilepicture{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
        doctor {
          data {
            id
            attributes {
              uid
              fullName
              meeting_token
              profilepicture{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
        appointmentDate
        typeOfVisit
        status
        generalPurpose
        condition
        notes
        patient_tkn
      }
    }
  }
}
`;

export const patientAppointmentsQueryByID = `query ($id: ID!) {
  appointments(
    filters: { id: {eq: $id} }
    sort: "appointmentDate:desc"
  ) {
    data {
      id
      attributes {
        uid
        patient {
          
          data {
            id
            attributes {
              uid
              fullName
              profilepicture{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
        doctor {
          data {
            id
            attributes {
              uid
              fullName
              profilepicture{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
        appointmentDate
        typeOfVisit
        status
        condition
        notes
      }
    }
  }
}
`;
