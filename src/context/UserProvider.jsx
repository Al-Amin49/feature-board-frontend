import  { createContext, useContext, useEffect, useState } from 'react';
import { userDetails } from '../api/User';
import Loading from '../components/Loading/Loading';
import { axiosSecure } from '../utils/axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      console.log('Headers before request:', axiosSecure.defaults.headers);
      const currentUser = await userDetails();
      console.log('currentUser in context', currentUser.data.user)
      console.log('Headers after request:', axiosSecure.defaults.headers);
      setUser(currentUser.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    axiosSecure.defaults.headers['Authorization'] = undefined;
  };


  useEffect(() => {
    // Ensure Token Inclusion
    const token = localStorage.getItem('token');
    axiosSecure.defaults.headers['Authorization'] = token ? `Bearer ${token}` : undefined;
    fetchUserData();
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
