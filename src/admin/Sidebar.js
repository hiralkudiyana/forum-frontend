import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "240px",
        background: "#212529",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h4 className="mb-4 text-center">ADMIN</h4>

      <NavLink to="/admin/users" className="d-block mb-3 text-white text-decoration-none">
        👤 Users
      </NavLink>

      <NavLink to="/admin/categories" className="d-block mb-3 text-white text-decoration-none">
        📂 Categories
      </NavLink>

      <div style={{ position: "absolute", bottom: 20 }}>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
