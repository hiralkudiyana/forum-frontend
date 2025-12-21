import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoute;
