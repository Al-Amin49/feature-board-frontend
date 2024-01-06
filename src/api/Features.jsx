import { axiosOpen } from "../utils/axios";


export const getAllFeatures = async () => {
    try {
      const response = await axiosOpen.get("/api/v1/features");
      return response;
    } catch (error) {
      console.error(error.response.data);
      throw error.response?.data;
    }
  };

// Function to search features by query
export const searchFeatures = async (query) => {
    try {
        const response = await axiosOpen.get(`/api/v1/features/search?query=${query}`);
        return response;
      } catch (error) {
        console.log(error)
        throw error;
      }
  };