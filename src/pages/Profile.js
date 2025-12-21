import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "../api/api";
import { toast } from "react-toastify";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    city: "",
    short_bio: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/profile");
        setForm({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          type: res.data.user.type || "",
          city: res.data.user.city || "",
          short_bio: res.data.user.short_bio || "",
        });
      } catch {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/profile", {
        name: form.name,
        type: form.type,
        city: form.city,
        short_bio: form.short_bio,
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      if (err.response?.data?.errors) {
        Object.values(err.response.data.errors)
          .flat()
          .forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.response?.data?.message || "Update failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: 600 }} className="mt-5">
      <h3>My Profile</h3>

      <Form onSubmit={submit}>
        {/* Name Editable */}
        <Form.Control
          className="mb-3"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email Readonly */}
        <Form.Control
          className="mb-3"
          value={form.email}
          disabled
        />

        {/* Role Dropdown */}
        <Form.Select
          className="mb-3"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="Role A">Role A</option>
          <option value="Role B">Role B</option>
          <option value="Role C">Role C</option>
        </Form.Select>

        <Form.Control
          className="mb-3"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <Form.Control
          as="textarea"
          rows={3}
          className="mb-3"
          placeholder="Short Bio"
          value={form.short_bio}
          onChange={(e) => setForm({ ...form, short_bio: e.target.value })}
        />

        <Button type="submit" disabled={loading} className="w-100">
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </Form>
    </Container>
  );
}
