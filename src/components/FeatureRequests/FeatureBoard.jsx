import { useEffect, useState } from "react";
import { getAllFeatures, searchFeatures } from "../../api/Features";
import Loading from "../Loading/Loading";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import SearchBar from "./SearchBar";
const FeatureBoard = ({features, setFeatures}) => {
  // const [features, setFeatures] = useState([]);
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
    console.log('Searching with query:', searchQuery);
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
      console.log('e.target', e.target.value);
      setSearchQuery(e.target.value);
    } else {
      console.error('Invalid event or target');
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
            <h3 >
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
           {features.length===0 ? 
            <p className="my-4 text-xl font-medium">No results found. Try a different search or create a new post!</p>
           : 
           <>
            {features.map((feature, index) => (
              <>
                <div key={index} className="p-2 m-2 flex justify-between items-center">
                  <div>
                  <h4 className="font-medium text-xl">{feature.title}</h4>
                    <p className="text-accent my-2">{feature.description}</p>
                  <p className="flex items-center ">
                    <span className="mr-1">
                      <FaRegCommentAlt />{" "}
                    </span>
                    {feature.comments ? 0 : 0}
                  </p>

                  </div>
                  <div>
                  <p className="flex flex-col  items-center border-2 p-2 border-r-2">
                      <span className="">
                        <BiUpvote />{" "}
                      </span>
                      {feature.votes ? 0 : 0}
                    </p>
                  </div>
                </div>
                <hr />
              </>
            ))}
           </>}
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureBoard;
