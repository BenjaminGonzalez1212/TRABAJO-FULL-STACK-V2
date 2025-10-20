import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;