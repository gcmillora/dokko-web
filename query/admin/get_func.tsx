export const QueryAllAppointments = `
query {
    appointments {
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

export const QueryAllPrescriptions = `
query {
    prescriptions {
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
                        id
                        attributes {
                            uid
                            }
                        }
                    }
                diagnosis
                prescription
                notes
                }
            }
        }
    }
`;

export const QueryAllDoctors = `
query {
    doctors {
        data {
            id
            attributes {
                uid
                fullName
                specialty
                email
                address
                }
            }
        }
    }
`;

export const QueryAllPatients = `
query {
    patients {
        data {
            id
            attributes {
                uid
                fullName
                phoneNumber
                email
                address
                }
            }
        }
    }
`;

export const QueryUser = `
query {
    usersPermissionsUsers {
        data {
            id
            attributes {
                username
                email
                level
            }
        }
    }
        `;
