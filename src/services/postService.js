import axiosInstance from "../api/axiosInstance";

const postService = {
  // GET
  getAll: async () => {
    const response = await axiosInstance.get("/posts");
    return response.data;
  },

  // GET
  getById: async (id) => {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  },

  // POST
  create: async (postData) => {
    const response = await axiosInstance.post("/posts", postData);
    return response.data;
  },

  // PUT
  update: async (id, postData) => {
    const response = await axiosInstance.put(`/posts/${id}`, postData);
    return response.data;
  },

  // DELETE
  delete: async (id) => {
    const response = await axiosInstance.delete(`/posts/${id}`);
    return response.data;
  },
};

export default postService;
