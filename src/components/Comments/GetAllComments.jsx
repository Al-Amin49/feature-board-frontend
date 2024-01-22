import { useEffect, useState } from "react";
import { getAllComments } from "../../api/Comments";
import Loading from "../Loading/Loading";

const GetAllComments = ({ singleFeature }) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);


  const fetchCommentsData = async () => {
    try {
      setLoading(true);
      const response = await getAllComments(singleFeature._id);
      console.log('comment response', response);
      setComments(response.data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentsData();
  }, [singleFeature._id]);

  console.log('Loading:', loading);
  console.log('Comments:', comments);

  return (
    <div>
      {loading ? (
        <p><Loading /></p>
      ) : (
        <div>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>
                  <div className="flex">
                 <img src={comment.user.profile}className="w-8 h-8 rounded-full" alt="" />
                 <p>Name: <b>{comment.user.username}</b></p>
                  </div>
                  <p className="py-2  ">{comment.text}</p>
                  {/* {user && user._id===comment.user._id && <div className="flex py-4 ">
                    <FaEdit className="mr-4 text-xl "></FaEdit>
                    <FaTrash className="text-xl" />
                  </div>} */}
                  
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GetAllComments;
