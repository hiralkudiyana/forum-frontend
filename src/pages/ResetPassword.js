import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../api/api";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  // Extract token & email from URL
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      toast.error("Invalid reset link");
      navigate("/login");
      return;
    }

    setForm((prev) => ({
      ...prev,
      token,
      email,
    }));
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/reset-password", form);
      toast.success(res.data.message || "Password reset successful");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        Object.values(err.response.data.errors)
          .flat()
          .forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.response?.data?.message || "Password reset failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }} className="mt-5">
      <h3 className="mb-4">Reset Password</h3>

      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={form.email} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Form>
    </Container>
  );
}
