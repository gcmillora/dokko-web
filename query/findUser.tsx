import axios, { Axios } from "axios";

export const findUser = async (jwtToken: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_STRAPI_RAW}/api/users/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );

  return response.data;
};
