import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
import { saveCookieValue } from "../utils/saveCookieValue";
import { deleteCookie } from "../utils/deleteCookie";
import { UserType } from "../types";

interface AuthContextType {
  user: UserType | null;
  login: (userData: { username: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  setUserId: (userId: string) => void;
  loginError: string;
  registerError: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const endPoint = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";
  const axiosInstance = axios.create({
    baseURL: endPoint,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  async function getUser() {
    return null;
  }

  useEffect(() => {
    getUser();
  }, []);

  const login = useCallback(() => {
    return async (userData: { username: string; password: string }) => {
      try {
        const res = await axiosInstance.post("/auth/login", userData);
        const { token } = res.data;

        if (!token) {
          throw new Error("Invalid token");
        }
        saveCookieValue("token", token);
        saveCookieValue("username", userData.username);
        setUser({ token, username: userData.username });
        setLoginError("");
      } catch (error) {
        console.log("error");
        deleteCookie("token");
        deleteCookie("username");
        setUser(null);
        setLoginError("Unexpected error happend during login");

        if (axios.isAxiosError(error) && !error.response) {
          throw new Error("Network Error");
        }
        throw error;
      }
    };
  }, []);

  const register = async (userData: any) => {
    try {
      const res = await axiosInstance.post("/auth/signup", userData);

      setRegisterError("Unexpected error happend during register");
    } catch (error) {
      setRegisterError("");
      console.error(error);
      if (axios.isAxiosError(error) && !error.response) {
        throw new Error("Network Error");
      }
      throw error;
    }
  };

  const setUserId = (userId: string) => {
    setUser({ token: user?.token || null });
    // Calculate the expiration date (e.g., 1 hour from now)
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour

    // Construct the cookie string
    const cookieValue = `userId=${encodeURIComponent(
      userId
    )}; expires=${expirationDate.toUTCString()}; path=/`;

    // Set the cookie
    document.cookie = cookieValue;
  };

  const logout = () => {
    const cookieName = "token";
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setUser(null);
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        setUserId,
        loginError,
        registerError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
