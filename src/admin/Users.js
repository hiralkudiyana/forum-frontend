import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import api from "../api/api";
import { toast } from "react-toastify";

const Users = () => {
  // const users = [
  //   { id: 1, name: "John Doe", email: "john@mail.com", role: "User" },
  //   { id: 2, name: "Jane Smith", email: "jane@mail.com", role: "User" },
  // ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);

      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <AdminLayout>
      <h3 className="mb-4">Users</h3>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>City</th>
            <th>Short Bio</th>
            <th width="120">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
          {users.map((u, i) => (
            <tr key={u.id}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.type}</td>
              <td>{u.city}</td>
              <td>{u.short_bio}</td>
              <td>
                <FaEdit className="text-primary me-3 cursor-pointer" />
                <FaTrash
                  className="text-danger cursor-pointer"
                  title="Delete"
                  onClick={() => deleteUser(u.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Users;
