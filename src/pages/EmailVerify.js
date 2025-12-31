import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function EmailVerify() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/forgot-password", { email });
      toast.success(res.data.message);
    } catch (err) {
      if (err.response?.data?.errors) {
        Object.values(err.response.data.errors)
          .flat()
          .forEach((msg) => toast.error(msg));
      } else {
        toast.error("Failed to send reset link");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: 450 }} className="mt-5">
      Email is verified. Please login.
      <Link to="/login" className="d-block mt-3">
        login
      </Link>
    </Container>
  );
}
