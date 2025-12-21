import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/api";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = async () => {
    try {
      await axios.post("/logout");
    } catch (e) {
      // ignore API failure
    } finally {
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Left side logo/text */}
        <Navbar.Brand as={Link} to="/">
          FORUM
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {token ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Button variant="outline-light" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
