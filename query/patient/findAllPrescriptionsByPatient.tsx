//find all prescriptions for a patient with pagination

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const findAllPrescriptions = async (
  patient_id: string,
  page: number
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    variables: {
      uid: patient_id,
    },
    query: gql`
      query ($uid: String!, $page: Int!) {
        prescriptions(filters: { patient: { uid: { eq: $uid } } }) {
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
              appointment {
                data {
                  id
                  attributes {
                    uid
                    appointmentDate
                    condition
                    typeOfVisit
                  }
                }
              }
              prescription
              diagnosis
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

export const patientPrescriptionsQuery = `query ($uid: String!) {
  prescriptions(filters: { patient: { uid: { eq: $uid } } }) {
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
                  id
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
                  id
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
        appointment {
          data {
            id
            attributes {
              uid
              appointmentDate
              condition
              typeOfVisit
            }
          }
        }
        prescription
        diagnosis
        notes
      }
    }
  }
}`;
