import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const validateSession = async () => {
    try {
      let response = await axiosInstance.post(
        "/user/validate-session",
        {}
      );
      if (!response?.data?.success) {
        alert("Session Timeout!");
        navigate("/");
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    validateSession();
  }, [location?.pathname]);

  return <Outlet />;
};

export default ProtectedRoute;
