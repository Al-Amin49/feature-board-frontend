import { axiosOpen } from "../utils/axios";


export const getAllFeatures = async () => {
    try {
      const response = await axiosOpen.get("/api/v1/features");
      return response;
    } catch (error) {
      console.error(error.response.data);
      throw error.response?.data?.msg;
    }
  };