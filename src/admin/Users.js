import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "./AdminLayout";

const Users = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@mail.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane@mail.com", role: "User" },
  ];

  return (
    <AdminLayout>
      <h3 className="mb-4">Users</h3>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="120">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <FaEdit className="text-primary me-3 cursor-pointer" />
                <FaTrash className="text-danger cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Users;
