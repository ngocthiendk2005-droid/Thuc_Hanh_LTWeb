import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import postService from "../services/postService";
import "./Posts.css";

const TEMP_USER_ID = 1;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [formLoading, setFormLoading] = useState(false);

  //GET
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAll();
      setPosts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Không thể tải bài viết.");
    } finally {
      setLoading(false);
    }
  };

  //POST
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const newPost = await postService.create({
        title: formData.title,
        content: formData.content,
        userId: TEMP_USER_ID,
      });
      // Thêm vào đầu danh sách
      setPosts((prev) => [newPost, ...prev]);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Tạo bài viết thất bại.");
    } finally {
      setFormLoading(false);
    }
  };

  //PUT cập nhật bài viết
  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await postService.update(editingPost.id, {
        title: formData.title,
        content: formData.content,
      });
      // Cập nhật trong danh sách
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? { ...p, title: formData.title, content: formData.content }
            : p,
        ),
      );
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Cập nhật thất bại.");
    } finally {
      setFormLoading(false);
    }
  };

  //DELETE xóa bài viết
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {
      await postService.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Xóa thất bại.");
    }
  };

  //Helpers
  const openEditForm = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingPost(null);
    setFormData({ title: "", content: "" });
  };

  return (
    <>
      <Navbar />
      <div className="posts-page">
        <div className="posts-wrapper">
          <div className="posts-header">
            <h1>Bài Viết</h1>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              + Tạo bài viết
            </button>
          </div>

          {/* ── FORM TẠO / SỬA ── */}
          {showForm && (
            <div className="modal-overlay" onClick={resetForm}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>
                  {editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
                </h2>
                <form onSubmit={editingPost ? handleUpdate : handleCreate}>
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, title: e.target.value }))
                    }
                    required
                  />
                  <label>Nội dung</label>
                  <textarea
                    placeholder="Nhập nội dung..."
                    rows={5}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, content: e.target.value }))
                    }
                    required
                  />
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={resetForm}
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={formLoading}
                    >
                      {formLoading
                        ? "Đang xử lý..."
                        : editingPost
                          ? "Lưu thay đổi"
                          : "Đăng bài"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── TRẠNG THÁI ── */}
          {loading && <p className="status-msg">Đang tải bài viết...</p>}
          {error && <p className="status-msg error">{error}</p>}

          {/* ── DANH SÁCH BÀI VIẾT ── */}
          {!loading && !error && posts.length === 0 && (
            <p className="status-msg">Chưa có bài viết nào.</p>
          )}

          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-card-body">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <span className="post-meta">
                    {post.author?.username || "Ẩn danh"} ·{" "}
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="post-card-actions">
                  <button
                    className="btn-edit"
                    onClick={() => openEditForm(post)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Posts;
