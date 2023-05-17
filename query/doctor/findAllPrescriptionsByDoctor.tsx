//find all prescriptions of a doctor with pagination

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const findAllPrescriptionsByDoctor = async (
  doctor_id: string,
  page: number
) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    variables: {
      uid: doctor_id,
      page: page,
    },
    query: gql`
      query ($uid: String!, $page: Int!) {
        prescriptions(
          filters: { doctor: { uid: { eq: $uid } } }
          pagination: { page: $page, pageSize: 8 }
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
              prescription
              diagnosis
              notes
              appointment {
                data {
                  attributes {
                    uid
                    appointmentDate
                    condition
                    typeOfVisit
                  }
                }
              }
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

export const QueryAllPrescriptionsDoctor = `query ($uid: String!) {
  prescriptions(filters: { doctor : { uid: { eq: $uid } } }) {
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
