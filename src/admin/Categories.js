import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import api from "../api/api"; // axios instance
import loader from '../Fadingcircles.gif'
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
      //alert("Failed to load categories");
    }
    finally {
      setLoading(false);
    }
  };

  // Add category
  const handleSave = async () => {
  if (!name.trim()) {
    toast.error("Category name is required");
    return;
  }

  setLoading(true);
  try {
    await api.post("/admin/categories", { name });

    toast.success("Category added successfully");

    setName("");
    setShowModal(false);
    fetchCategories(); // refresh list
  } catch (err) {
    console.error(err);

    // Laravel validation / duplicate entry handling
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      Object.values(errors).forEach(error =>
        toast.error(error[0])
      );
    } else if (err.response?.status === 409) {
      toast.error("Category already exists");
    } else {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  } finally {
    setLoading(false);
  }
};


  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      setLoading(true);
      await api.delete(`/admin/categories/${id}`);
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Category deleted successfully");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete category"
      );
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Categories</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add Category
        </Button>
      </div>

      {/* Table */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th width="120">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                {loading ? <img src={loader}/> : "No categories found"} 
              </td>
            </tr>
          )}

          {categories.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>
                {/* Edit later */}
                {/* <FaEdit className="text-primary me-3 cursor-pointer" /> */}

                <FaTrash
                  className="text-danger cursor-pointer"
                  onClick={() => handleDelete(c.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Categories;
