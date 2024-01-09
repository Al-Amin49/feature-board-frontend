import { useEffect } from "react";
import { getAllVoters } from "../../api/Features";
import Loading from "../Loading/Loading";


const GetAlllVotes = ({singleFeature, setSingleFeature}) => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Check if singleFeature is defined before accessing its _id property
            if (singleFeature && singleFeature._id) {
              const response = await getAllVoters(singleFeature._id);
              console.log('response',response?.data);
              setSingleFeature(response?.data); // Update state with voters data
            } else {
              console.log("Error: Feature is undefined or does not have a valid _id");
            }
          } catch (error) {
            console.log("Error fetching voters:", error);
          }
        };
    
        fetchData();
      }, []); // Add singleFeature as a dependency if it's used in the fetchData function
    
      if (!singleFeature ) {
        return <Loading/>; // or some loading indicator
      }
    return (
        <div className="border-2 px-10 py-4 my-2">
            <h3>VOTERS</h3>
            {/* <ul>
        {singleFeature.votes.map((voter) => (
          <li key={voter._id}>{voter.username}</li>
          // Adjust this according to your voter data structure
        ))}
      </ul> */}
        </div>
    );
};

export default GetAlllVotes;