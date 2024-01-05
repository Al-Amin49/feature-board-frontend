import { createContext, useContext, useEffect, useState } from "react";
import { userDetails } from "../api/User";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await userDetails();
        console.log('current user', currentUser.data.userData.email)
        setUser(currentUser.data.userData);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserData();
  }, []);
  const authInfo = {
    user,
    setUser,
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
