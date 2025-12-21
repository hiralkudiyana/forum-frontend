import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-light">
        <Container fluid>{children}</Container>
      </div>
    </div>
  );
};

export default AdminLayout;
