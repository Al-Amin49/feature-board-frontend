import { useEffect, useState } from "react";
import { getAllFeatures, searchFeatures } from "../../api/Features";
import Loading from "../Loading/Loading";
import { FaRegCommentAlt } from "react-icons/fa";

import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import AddVote from "../votes/AddVote";
const FeatureBoard = ({ features, setFeatures }) => {
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSort = () => {
    let sortedFeatures = [...features];

    switch (selectedOption) {
      case "trending":
        sortedFeatures.sort(
          (a, b) =>
            b.votes.length +
            b.comments.length -
            (a.votes.length + a.comments.length)
        );
        break;

      case "top":
        sortedFeatures.sort((a, b) => b.votes.length - a.votes.length);
        break;

      case "new":
        sortedFeatures.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "alphabetical":
        sortedFeatures.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        break;
    }

    setFeatures(sortedFeatures);
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
                  onClick={handleSort}
                >
                  <optgroup label="Sort">
                    <option value="trending">Trending</option>
                    <option value="top">Top</option>
                    <option value="new">New</option>
                    <option value="alphabetical">Alphabeticall</option>
                  </optgroup>
                  {/* <optgroup label="Filter">
                    <option value="under-review">Under Review</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                  </optgroup> */}
                </select>
                <span className="ml-2"> Post </span>
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
                          {feature.comments ? feature.comments.length : 0}
                        </p>
                      </div>
                      <div>
                        {/* <p
                          className="flex flex-col  items-center border-2 p-2 border-r-2"
                          onClick={(event) => handleVote(event, feature._id)}
                        >
                          <span className="">
                            <BiUpvote />{" "}
                          </span>
                          {feature.votes ? feature.votes.length : 0}
                        </p> */}
                        <AddVote
                          feature={feature}
                          setFeatures={setFeatures}
                        ></AddVote>
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
