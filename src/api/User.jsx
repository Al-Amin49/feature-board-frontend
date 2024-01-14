import { axiosOpen, axiosSecure } from "../utils/axios";

//registered user
export const signUpUser = async (userData) => {
  try {
    const response = await axiosOpen.post("api/v1/users/register", userData);
    const { token } = response.data;
    console.log('token register',token)
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
    console.log('token login',token)
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
    console.log('Headers before request:', axiosSecure.defaults.headers)
    const response= await axiosSecure.get('api/v1/users/user');
    console.log('Response from userDetails API:', response);
    return response;
  }catch (error) {
    console.log(error);
    throw new error();
  }
}

export const getAllUsers=async()=>{
  try{
    const response= await axiosSecure.get('api/v1/users/allusers');
    return response.data;
  }
  catch(error){
    console.log(error)
  }
}

export const deletedUser = async (id) => {
  try {
    const response = await axiosSecure.delete(`/api/v1/users/${id}`);
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
};
//make admin 
export const makeAdminUser = async (id) => {
  try {
    const response = await axiosSecure.put(`/api/v1/users/makeAdmin/${id}`);
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
};