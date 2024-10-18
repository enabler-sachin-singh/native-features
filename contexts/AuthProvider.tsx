import React, { createContext, useState } from "react";
import { UserProfileType } from "@/types";

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserProfileType | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

interface AuthProviderInterface {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserProfileType | null>(null);

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null); // Reset to null on logout
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    userInfo,
    setUserInfo,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
