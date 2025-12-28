import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";


export default function AddPostModal({ show, handleClose, refresh }) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (show) {
      api.get("/admin/categories").then(res => {
        setCategories(res.data.data);
      });
    }
  }, [show]);

const submit = async () => {
  try {
    await api.post("/admin/posts", {
      title,
      category_id: categoryId,
    });

    toast.success("Post created successfully");

    setTitle("");
    setCategoryId("");
    refresh();
    handleClose();
  } catch (error) {
    console.error(error);

    // Laravel / API validation error handling
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong. Please try again.";

    toast.error(message);
  }
};


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
