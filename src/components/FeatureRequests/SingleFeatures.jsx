import { useEffect, useState } from "react";
import { getSingleFeatures } from "../../api/Features";
import { useParams } from "react-router-dom";

const SingleFeatures = () => {
  const [singleFeature, setSingleFeature] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleFeatures(id); 
        console.log('response single', response)
        setSingleFeature(response.data);
      } catch (error) {
        console.error("Error fetching single feature:", error);
      }
    };

    fetchData();
  }, [id]); // Include id in the dependency array

  return (
    <div>
      <h2>Hello{singleFeature.title}</h2>
      <p>{singleFeature.description}</p>
    </div>
  );
};

export default SingleFeatures;
