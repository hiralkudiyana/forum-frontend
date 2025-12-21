import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "./AdminLayout";

const Categories = () => {
  const categories = [
    { id: 1, name: "General Discussion" },
    { id: 2, name: "Technology" },
    { id: 3, name: "News" },
  ];

  return (
    <AdminLayout>
      <h3 className="mb-4">Categories</h3>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th width="120">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
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

export default Categories;
