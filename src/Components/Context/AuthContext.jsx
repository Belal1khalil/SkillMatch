import { createContext, useState } from "react";

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    function Logout() {
        setToken(null);
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");
    }

  return (
    <AuthContext.Provider value={{ token, setToken, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
