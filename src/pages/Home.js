import { Container, Accordion, Spinner, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import ForumCategory from "../components/ForumCategory";
import api from "../api/api";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (err) {
      setError("Failed to load forum categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Forum</h3>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Accordion defaultActiveKey="0">
          {categories && categories.map((category, index) => (
            <ForumCategory key={index} category={category} index={index} />
          ))}
        </Accordion>
      )}
    </Container>
  );
}
