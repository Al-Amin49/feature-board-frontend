import { useEffect, useState } from "react";
import { getAllFeatures } from "../../api/Features";
import Loading from "../Loading/Loading";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
const FeatureBoard = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const [selectedOption, setSelectedOption] = useState("");

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
         <fieldset className="form-control w-80">
            <div className="join">
              <input
                type="text"
                placeholder="search"
                className="input input-bordered join-item"
              />
            
            </div>
          </fieldset>
         </div>
          </div>

         
          <div>
            <hr />
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
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureBoard;
