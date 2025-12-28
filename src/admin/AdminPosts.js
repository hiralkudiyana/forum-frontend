import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AdminLayout from "./AdminLayout";
import AddPostModal from "./AddPostModal";
import api from "../api/api";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import loader from '../Fadingcircles.gif'

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/posts");
      setPosts(res.data.data);
    } catch (err) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };
  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    setLoading(true);
    try {
      await api.delete(`/admin/posts/${id}`);
      toast.success("Post deleted successfully");
      fetchPosts(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to delete post"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between mb-3">
        <h3>Posts</h3>
        <Button onClick={() => setShow(true)}><FaPlus className="me-2" /> Add Post</Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
             <th width="120">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                {loading ? <img src={loader}/> : "No posts found"} 
              </td>
            </tr>
          )}
          {posts.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.title}</td>
              <td>{p.category?.name}</td>
              <td>
                {/* <FaEdit className="me-3 text-primary cursor-pointer" /> */}
                <FaTrash
                  className="text-danger cursor-pointer"
                  onClick={() => deletePost(p.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddPostModal
        show={show}
        handleClose={() => setShow(false)}
        refresh={fetchPosts}
      />
    </AdminLayout>
  );
}
