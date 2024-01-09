import { useEffect, useState } from "react";
import { getAllVoters } from "../../api/Features";
import Loading from "../Loading/Loading";
import { useFeature } from "../../context/FeatureProvider";

const GetAllVotes = () => {
  const { features, setFeatures } = useFeature();
  const [loading, setLoading] = useState(true);
  const [voters, setVoters] = useState([]);

  const fetchVotersData = async (featureId) => {
    try {
      setLoading(true);
      const response = await getAllVoters(featureId);
      setVoters(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (features && features.length > 0) {
      // Assuming you want to get voters for the first feature
      const featureId = features[0]._id;
      fetchVotersData(featureId);
    }
  }, [features]);

  return (
    <div className="border-2 px-10 py-4 my-2">
      <h3>VOTERS</h3>
      {loading ? (
        <Loading />
      ) : (
        <ul>
          {voters.map((vote) => (
            <li key={vote._id}>{vote._id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetAllVotes;
