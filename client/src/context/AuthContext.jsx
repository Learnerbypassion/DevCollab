import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/user.api"; // 👈 from your user api

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch logged-in user using cookie
  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data.user); // adjust if your backend returns differently
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // runs on app load
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser, // useful after login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;