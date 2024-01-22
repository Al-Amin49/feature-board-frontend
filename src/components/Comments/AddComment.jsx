import { useState } from "react";
import GetAllComments from "./GetAllComments";
import { addComment } from "../../api/Comments";
import { toast } from "react-toastify";



const AddComment = ({ singleFeature }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleCommentSubmit = async () => {
    try {
      setLoading(true)
      // Make the API call to add a comment
      const response = await addComment(singleFeature._id, { text: commentText });

      // Update the comments state with the new comment
      setComments([...comments, response.data]);
      toast.success("Comment added successfully")
      window.location.reload();
      
      // Clear the comment input field
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="my-10">
      <input
        type="text"
        placeholder="Leave a comment"
        className="input input-bordered input-accent w-full max-w-xs"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="btn btn-primary ml-2"
        onClick={handleCommentSubmit}
        disabled={!commentText.trim()} // Disable button if commentText is empty or only contains whitespace
      >
        Add Comment
      </button>
      <GetAllComments singleFeature={singleFeature} />
    </div>
  );
};

export default AddComment;
