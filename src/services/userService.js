import axiosInstance from "../api/axiosInstance";

const userService = {
  // GET - Lấy tất cả users
  getAll: async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  },

  // GET - Lấy user theo ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // POST - Đăng ký user mới
  create: async (userData) => {
    // userData: { username, email, password, avatarUrl }
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  },

  // PUT - Cập nhật thông tin user
  update: async (id, userData) => {
    // userData: { username, avatarUrl }
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  // DELETE - Xóa user
  delete: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;
