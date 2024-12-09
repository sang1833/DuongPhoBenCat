import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import checkAuth from "../api/auth";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const token = checkAuth();
  if (!token) {
    <Navigate to="/login" />;
  }

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user") as string);
      const isLogin =
        userInfo?.token !== null && userInfo?.refreshToken && userInfo?.role;
      setIsLogin(isLogin);
    } catch (error: unknown) {
      console.error("Unexpected error during checking login:", error);
      setIsLogin(false);
    }
  }, []);

  if (isLogin === null) {
    return <div>Loading...</div>;
  }

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
