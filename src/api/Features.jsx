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
    const response = await axiosOpen.get(`/api/v1/features/${id}`, {params: { populateUser: true }} );
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
}

//get all features request
export const getAllFeatures = async (params) => {
    try {
      const response = await axiosOpen.get("/api/v1/features", {params});
      return response;
    } catch (error) {
      console.error(error.response.data);
      throw error.response?.data;
    }
  };
export const getAllFeaturesForHome = async () => {
    try {
      const response = await axiosOpen.get('api/v1/features/feature-home');
      return response;
    } catch (error) {
      console.error(error.response.data);
      throw error.response?.data;
    }
  };

  // Edit feature by ID
export const editFeature = async (id, updatedData) => {
  try {
    const response = await axiosSecure.patch(`/api/v1/features/${id}`, updatedData);
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
};

// Delete feature by ID
export const deleteFeature = async (id) => {
  try {
    const response = await axiosSecure.delete(`/api/v1/features/${id}`);
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


// add Vote for a feature by ID
export const voteFeature = async (id) => {
  try {
    console.log(`Attempting to vote for feature with ID: ${id}`);
    const response = await axiosSecure.post(`/api/v1/features/${id}/vote`);
    console.log('Vote successful. Response:', response);
    return response;
  } catch (error) {
    console.error("Error in voteFeature API call:", error);
    throw new Error("Failed to vote on the feature.");
  }
};

// get  all voters

export const getAllVoters = async (id) => {
  try {
    const response = await axiosOpen.get(`/api/v1/features/${id}/vote`);
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
};

export const getTotalVotesCount = async () => {
  try {
    const response = await axiosSecure.get("/api/v1/features/votes/count",);
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
};

export const updateFeatureStatus=async(id, updatedData)=>{
  try {
    const response = await axiosSecure.put(`/api/v1/features/${id}`, updatedData);
    console.log('update api status', response)
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response?.data;
  }
}

export const getFeatureWithVotes = async (id) => {
  try {
    const response = await axiosSecure.get(`/api/v1/features/${id}/feature-with-votes}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};