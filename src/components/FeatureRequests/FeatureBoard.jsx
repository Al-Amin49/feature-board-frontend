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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchData = async (newPage) => {
    try {
      console.log('Fetching data for page', newPage);
      const response = await getAllFeatures({ page:  newPage});
      console.log('response', response)
      setFeatures(response.data.features);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = async(newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log('Changing page to', newPage);
      setCurrentPage(newPage);
       setLoading(true);
    await fetchData(newPage);
    }
  };
  useEffect(() => {
   

    fetchData(currentPage);
  }, []);
  const handleSearch = async () => {
    try {
      console.log("Searching with query:", searchQuery);
      setLoading(true);
      const response = await searchFeatures(searchQuery);
      // Check the structure of the response and update your code accordingly
      const searchResults = response.data.features || response.data;

      setFeatures(searchResults);
      setTotalPages(searchResults.totalPages || 1);
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
    // Reset to the first page when changing the sorting option
    setCurrentPage(1); 
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
             
              {features.length===0? 
               <p className="my-4 text-xl font-medium">
               We couldnt find anything. Try a new search or create a new post!
             </p>
              :
              <>
                { features.map((feature, index) => (
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
                        <AddVote
                          feature={feature}
                          setFeatures={setFeatures}
                        ></AddVote>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            }
           
            <hr />
          </div>
        </div>
      )}
      
      <div className="flex justify-center items-center mt-4">
              <button
                className="btn btn-primary mr-1" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-primary ml-1"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
    </div>
  );
};

export default FeatureBoard;
