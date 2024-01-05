import { createContext, useContext, useEffect, useState } from "react";
import { userDetails } from "../api/User";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //fetch user Data
  const fetchUserData = async () => {
    try {
      setLoading(true)
      const currentUser = await userDetails();
      setUser(currentUser.data.userData);
    } catch (error) {
      console.log("error", error);
    }finally {
      setLoading(false);
    }
  };
  const logOut = () => {
    setUser(null)
    localStorage.removeItem('token');
  };
  useEffect(() => {
    fetchUserData();
    logOut();
  }, []);

 
  const authInfo = {
    user,
    setUser,
    logOut,
    loading,
    setLoading
  };
  return (
    <div>
      <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(UserContext);
  console.log('authcontext', authContextValue)
  if (!authContextValue) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return authContextValue;
};
