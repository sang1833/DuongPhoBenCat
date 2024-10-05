import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isLogin = Cookies.get("isLogin");
  console.log("isLogin", isLogin);
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
