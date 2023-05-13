import { updatePatientMeetingToken } from './updatePatientMeetingToken';

export const createPatientMeetingToken = async (
  doctorUID: string,
  appointmentID: string,
  appointmentDate: Date
) => {
  const data = fetch('https://api.daily.co/v1/meeting-tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 31b1e44009c810a075699272ddcbc6d9544cadd81244a1f7d6a22a0d1db55950`,
    },
    body: JSON.stringify({
      properties: {
        room_name: doctorUID,
        nbf: new Date(appointmentDate).getTime() / 1000,
        exp: new Date(appointmentDate).getTime() / 1000 + 3600,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      updatePatientMeetingToken(data.token, appointmentID);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
