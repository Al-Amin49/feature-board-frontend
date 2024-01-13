import { toast } from "react-toastify";
import { getAllFeatures, voteFeature } from "../../api/Features";
import { useState } from "react";
import { useAuth } from "../../context/UserProvider";
import { BiUpvote } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const AddVote = ({feature,setFeatures}) => {
    const [loading, setLoading] = useState(true);
    const {user, setUser}=useAuth();
    const navigate=useNavigate();
    const handleVote = async (event, featureId) => {
        try {
          event.preventDefault();
          setLoading(true);
          
         
          // Make a request to the voteFeature API endpoint
          await voteFeature(featureId);
    
          // Update the features after voting
          // Fetch the updated features from the server
          const updatedFeatures = await fetchUpdatedFeatures();
    
          // Set the updated features in the state
          setFeatures(updatedFeatures);
          
    
          // Check if the user is authenticated
          if (user) {
            // Check if the user has already voted or unvoted
            const hasVoted = updatedFeatures
            .find((feature) => feature._id === featureId)
            ?.votes.some((vote) => vote?.toString() === user._id.toString());
    
            // Show a toast message based on the voting status
            if (hasVoted) {
              toast.success("Vote added successfully");
            } else {
              toast.success("Vote removed successfully");
            }
          } else {
            
              navigate("/login"); 
              return;
            
          }
        } catch (error) {
            console.error("Error voting:", error);
            console.log("Full error object:", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchUpdatedFeatures = async () => {
        try {
          // Make a request to the API endpoint that provides the latest feature data
          const response = await getAllFeatures();
          return response.data.features;
        } catch (error) {
          console.error("Error fetching updated features:", error);
          throw error; 
        }
      };
    
  return (
    <div>
      <p
        className="flex flex-col  items-center border-2 p-2 border-r-2"
        onClick={(event) => handleVote(event, feature._id)}
      >
        <span className="">
          <BiUpvote />{" "}
        </span>
        {feature.votes ? feature.votes.length : 0}
      </p>
    </div>
  );
};

export default AddVote;
