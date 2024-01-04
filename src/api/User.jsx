//registered user
import { axiosOpen } from "../utils/axios";

export const signUpUser = async (userData) => {
  try {
    const response = await axiosOpen.post("api/v1/users/register", userData);
    const { token } = response.data;
    console.log(response.data);
    localStorage.setItem("token", token) 
    return response;
  } catch (error) {
    console.log(error);
    throw new error();
  }
};
