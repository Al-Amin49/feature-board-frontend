import  { createContext, useContext, useEffect, useState } from 'react';
import { userDetails } from '../api/User';
import Loading from '../components/Loading/Loading';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const currentUser = await userDetails();
      setUser(currentUser.data.userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };


  useEffect(() => {
    fetchUserData();
    logOut
  }, []);

  const authInfo = {
    user,
    setUser,
    logOut,
    loading,
    setLoading,
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
      )}
    </div>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(UserContext);

  if (!authContextValue) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return authContextValue;
};
