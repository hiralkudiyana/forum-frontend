import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "../api/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.post("/login", form);

      const user = res.data.user; // ✅ DEFINE USER HERE

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      // ✅ ROLE BASED REDIRECT
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }

    } catch (err) {
      if (err.response?.data?.errors) {
        Object.values(err.response.data.errors)
          .flat()
          .forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: 450 }} className="mt-5">
      <h3>Login</h3>

      <Form onSubmit={submit}>
        <Form.Control
          className="mb-3"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Form.Control
          className="mb-3"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button type="submit" disabled={loading} className="w-100">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>

      <Link to="/forgot-password" className="d-block mt-3">
        Forgot Password?
      </Link>
      <Link to="/register" className="d-block mt-3">
        New User?
      </Link>
    </Container>
  );
}
