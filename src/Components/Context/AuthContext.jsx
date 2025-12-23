import { createContext, useEffect, useState } from "react";
import { getProfileData } from "../../services/profile-services";

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [token, setToken] = useState(() => 
        localStorage.getItem("userToken") || sessionStorage.getItem("userToken") || null
    );
    
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
