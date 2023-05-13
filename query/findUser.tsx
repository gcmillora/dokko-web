import axios, { Axios } from 'axios';

export const findUser = async (jwtToken: string) => {
  const response = await axios.get(`127.0.0.1/api/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response.data;
};
