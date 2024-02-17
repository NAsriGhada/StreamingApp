import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isAuth = localStorage.getItem("token");

  useEffect(() => {
    //     // Redirect based on user's role
    if (!isAuth && user) {
      navigate("/login", { replace: true });
    }
  }, [user, isAuth, navigate]);

  return isAuth ? children : null;
};

export default ProtectedRoute;
