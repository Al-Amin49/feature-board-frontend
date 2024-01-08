import { useEffect, useState } from "react";
import {
  getAllFeatures,
  searchFeatures,
  voteFeature,
} from "../../api/Features";
import Loading from "../Loading/Loading";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserProvider";
const FeatureBoard = ({ features, setFeatures }) => {
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFeatures();
        setFeatures(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSearch = async () => {
    try {
      console.log("Searching with query:", searchQuery);
      setLoading(true);
      const response = await searchFeatures(searchQuery);
      setFeatures(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSearch = (e) => {
    if (e && e.target) {
      console.log("e.target", e.target.value);
      setSearchQuery(e.target.value);
    } else {
      console.error("Invalid event or target");
    }
  };

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
          ?.votes.some((vote) => vote.equals(user._id));

        // Show a toast message based on the voting status
        if (hasVoted) {
          toast.success("Vote removed successfully");
        } else {
          toast.success("Vote added successfully");
        }
      } else {
        // Show a message for non-authenticated users
        toast.info("Please log in to vote");
      }
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUpdatedFeatures = async () => {
    try {
      // Make a request to the API endpoint that provides the latest feature data
      const response = await getAllFeatures();

      // Return the updated features from the API response
      return response.data;
    } catch (error) {
      console.error("Error fetching updated features:", error);
      throw error; // You may want to handle this error based on your application's requirements
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="border-2 p-4 ">
          <div className="flex justify-around  items-center">
            <h3>
              <div>
                <span className="mr-2">Showing </span>
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  className="select select-accent max-w-32 "
                >
                  <optgroup label="Sort">
                    <option value="trending">Trending</option>
                    <option value="top">Top</option>
                    <option value="new">New</option>
                  </optgroup>
                  <optgroup label="Filter">
                    <option value="under-review">Under Review</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                  </optgroup>
                </select>
                <span className="ml-2">Post</span>
              </div>
            </h3>
            <div>
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleChangeSearch}
                onSearchSubmit={handleSearch}
              />
            </div>
          </div>

          <div>
            <hr />
            {features.length === 0 ? (
              <p className="my-4 text-xl font-medium">
                No results found. Try a different search or create a new post!
              </p>
            ) : (
              <>
                {features.map((feature, index) => (
                  <Link
                    key={feature._id || index}
                    to={`/feedback/features/${feature._id}`}
                  >
                    {/* Wrap each feature item with a Link to navigate to its details */}
                    <div className="p-2 m-2 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-xl">{feature.title}</h4>
                        <p className="text-accent my-2">
                          {feature.description}
                        </p>
                        <p className="flex items-center ">
                          <span className="mr-1">
                            <FaRegCommentAlt />{" "}
                          </span>
                          {feature.comments ? 0 : 0}
                        </p>
                      </div>
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
                    </div>
                  </Link>
                ))}
              </>
            )}
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureBoard;
