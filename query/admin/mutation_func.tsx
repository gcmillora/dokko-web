export const DeletePatientData = `mutation ( $id: ID! ) {
    deletePatient(id: $id) {
        data{
            id
            attributes{
              uid
              fullName
              createdAt
            }
          }
        }
      }
    `;

export const DeleteUserData = `mutation ( $id: ID! ) {
    deleteUser(id: $id) {
        data{
            id
            attributes{
              uid
              email
              createdAt
            }
          }
        }
    }
        `;
