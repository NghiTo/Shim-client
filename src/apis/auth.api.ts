import axios from "axios";

export const getNewAccessToken = async () => {
  const response = await axios.get("http://localhost:3000/api/auth/refreshToken", {
    withCredentials: true,
  });
  return response;
};
