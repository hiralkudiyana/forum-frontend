import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ForumDetails from "./pages/ForumDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Admin
import AdminDashboard from "./admin/AdminDashboard";

import Users from "./admin/Users";
import Categories from "./admin/Categories";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminPosts from "./admin/AdminPosts";


function AppRoutes() {
  const location = useLocation();

  // Detect admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Header/Footer ONLY if NOT admin */}
      {!isAdminRoute ? (
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/forum/:id" element={<ForumDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* User Protected */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      ) : (
        // Admin routes WITHOUT Layout
        <Routes>
          <Route path="/admin/dashboard" 
          element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <Users />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <AdminProtectedRoute>
                <Categories />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/posts"
            element={
              <AdminProtectedRoute>
                <AdminPosts />
              </AdminProtectedRoute>
            }
          />

        </Routes>
        
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
