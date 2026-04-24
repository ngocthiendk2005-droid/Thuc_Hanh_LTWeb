import axiosInstance from "../api/axiosInstance";

const commentService = {
  // GET - Lấy tất cả comments của 1 bài viết
  getByPost: async (postId) => {
    const response = await axiosInstance.get(`/comments/post/${postId}`);
    return response.data;
  },

  // POST - Thêm comment mới
  create: async (commentData) => {
    // commentData: { content, postId, userId }
    const response = await axiosInstance.post("/comments", commentData);
    return response.data;
  },

  // PUT - Sửa comment
  update: async (id, content) => {
    const response = await axiosInstance.put(`/comments/${id}`, { content });
    return response.data;
  },

  // DELETE - Xóa comment
  delete: async (id) => {
    const response = await axiosInstance.delete(`/comments/${id}`);
    return response.data;
  },
};

export default commentService;
