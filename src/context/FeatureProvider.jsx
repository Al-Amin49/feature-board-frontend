import  { createContext, useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading';
import { getAllFeatures } from '../api/Features';

export const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
  const [features, setFeatures] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFeatureData = async () => {
    try {
      const response = await getAllFeatures();
      console.log('featureProvider', response.data.features)
      setFeatures(response.data.features);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchFeatureData();
  }, []);

  const featureInfo = {
   setFeatures,
   features,
    loading,
    setLoading,
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <FeatureContext.Provider value={featureInfo}>{children}</FeatureContext.Provider>
      )}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFeature = () => {
  const authContextValue = useContext(FeatureContext);

  if (!authContextValue) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return authContextValue;
};
