import { axiosOpen, axiosSecure } from "../utils/axios";

export const getAllComments = async (id) => {
    try {
      const response = await axiosOpen.get(`/api/v1/features/${id}/comments`);
      console.log('response from comments api', response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // eslint-disable-next-line react-refresh/only-export-components
  export const getTotalCommentsCount = async () => {
    try {
      const response = await axiosSecure.get("/api/v1/features/comments/count",);
      return response;
    } catch (error) {
      console.error(error.response.data);
      throw error.response?.data;
    }
  };

  // eslint-disable-next-line react-refresh/only-export-components
  export const addComment = async (featureId, commentData) => {
    try {
      const response = await axiosSecure.post(`/api/v1/features/${featureId}/comments`, commentData);
      console.log('response from add api', response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const EditComment = async (featureId,commentId, commentData) => {
    try {
      const response = await axiosSecure.patch(`/api/v1/features/${featureId}/comments/${commentId}`, commentData);
      console.log('response from add api', response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
