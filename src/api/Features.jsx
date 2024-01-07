import { axiosOpen, axiosSecure } from "../utils/axios";


//add feature request 

export const addFeature = async (featureData) => {
  try {
    const response = await axiosSecure.post("/api/v1/features", featureData);
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
};

//get single fetures

export const getSingleFeatures=async(id)=>{
  try {
    const response = await axiosSecure.post(`/api/v1/features/${id}` );
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
}

//get all features request
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

// Function to sort features
export const sortFeatures = async (sortOption) => {
    try {
      const response = await axiosOpen.get(`/api/v1/features/sort/${sortOption}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };