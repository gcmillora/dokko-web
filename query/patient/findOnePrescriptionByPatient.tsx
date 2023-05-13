//find one prescription by patient

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const findOnePrescription = async (uid: string) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    variables: {
      uid: uid,
    },
    query: gql`
      query ($uid: String!) {
        prescriptions(filters: { uid: { eq: $uid } }) {
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
                    medical_redicord {
                      data {
                        id
                        attributes {
                          uid
                          sex
                          weight
                          height
                          allergies
                          bloodtype
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
                  }
                }
              }
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
              prescription
              diagnosis
            }
          }
        }
      }
    `,
  });

  return data;
};
