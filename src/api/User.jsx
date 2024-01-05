import { axiosOpen, axiosSecure } from "../utils/axios";

//registered user
export const signUpUser = async (userData) => {
  try {
    const response = await axiosOpen.post("api/v1/users/register", userData);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.log(error);
    throw new error();
  }
};

//loginuser
export const loginUser = async (userData) => {
  try {
    const response = await axiosOpen.post("api/v1/users/login", userData);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.log(error);
    throw new error();
  }
};

//user details

export const userDetails=async()=>{
  try{
    const response= await axiosSecure.get('api/v1/users/user');
    return response;
  }catch (error) {
    console.log(error);
    throw new error();
  }
}
