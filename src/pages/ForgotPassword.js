import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "../api/api";
import { toast } from "react-toastify";

export default function ForgotPassword() {
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
      <h3>Forgot Password</h3>

      <Form onSubmit={submit}>
        <Form.Control
          className="mb-3"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" disabled={loading} className="w-100">
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </Form>
    </Container>
  );
}
