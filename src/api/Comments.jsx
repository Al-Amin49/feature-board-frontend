import { axiosOpen, axiosSecure } from "../utils/axios";

export const getAllComments = async (id) => {
    try {
      const response = await axiosOpen.get(`/api/v1/features/${id}/comments`);
      console.log('response from comments api',  response)
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getTotalCommentsCount = async () => {
    try {
      const response = await axiosSecure.get("/api/v1/features/comments/count",);
      return response;
    } catch (error) {
      console.error(error.response.data);
      throw error.response?.data;
    }
  };