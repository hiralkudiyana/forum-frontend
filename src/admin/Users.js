import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import api from "../api/api";
import { toast } from "react-toastify";
import loader from '../Fadingcircles.gif'

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
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  const banUser = async (id) => {
    if (!window.confirm("Ban this user?")) return;
    await api.patch(`/admin/users/${id}/ban`);
    fetchUsers();
  };

  const unbanUser = async (id) => {
    await api.patch(`/admin/users/${id}/unban`);
    fetchUsers();
  };

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, []);

  

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
            <th>status</th>
            <th width="120">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center p-4">
                {loading ? <img src={loader}/> : "No users found"} 
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
              
              <td >
                {u.is_banned ? (
                  <span className="badge bg-danger" style={{marginRight:"5px"}} >Banned</span>
                ) : (
                  <span className="badge bg-success" style={{marginRight:"5px"}}>Active</span>
                )}
                {u.is_banned ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => unbanUser(u.id)}
                  >
                    Unban
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => banUser(u.id)}
                  >
                    Ban
                  </button>
                )}

              </td>
              <td>
                {/* <FaEdit className="text-primary me-3 cursor-pointer" /> */}
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
