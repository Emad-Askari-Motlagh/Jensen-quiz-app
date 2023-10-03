import React from "react";
import { Navigate } from "react-router-dom";

interface User {
  // Define the user properties as needed
}

interface ProtectedRouteProps {
  user: User | null;
  redirectPath?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  redirectPath = "/auth/login",
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

export const P = (Wrapped: React.ComponentType<any>) => {
  return (props: any) => {
    if (!props?.user) {
      return <Navigate to={props?.redirectPath ?? "/auth/login"} replace />;
    } else {
      return <Wrapped {...props} />;
    }
  };
};
