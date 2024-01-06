import { useEffect, useState } from "react";
import { getAllFeatures } from "../../api/Features";
import Loading from "../Loading/Loading";

const FeatureBoard = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFeatures();
        setFeatures(response.data);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
  
      {loading ? (
        <Loading/>
      ) : (
        <div>
              
         <div className="border-2 p-4">
         <hr/>
         {features.map((feature, index) => (
            <>
            <div key={index} className="p-2 m-2">
              <h4 className="font-medium text-xl">{feature.title}</h4>
              <div className="flex">
              <p className="text-accent">{feature.description }</p>
              <p><FaRegCommentAlt/> {feature.votes ?? 0}</p>
              </div>
             
              <p>Comments: {feature.comments ?? 0 }</p>
             
              {/* Add more properties as needed */}
            </div>
            <hr/>
            </>
            
          ))}
           <hr />
         </div>
        </div>
      )}
    </div>
  );
};

export default FeatureBoard;
