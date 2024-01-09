import { axiosOpen } from "../utils/axios";

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
