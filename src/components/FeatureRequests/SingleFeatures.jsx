import { useEffect, useState } from "react";
import {
  getSingleFeatures,
  editFeature,
  deleteFeature,
} from "../../api/Features";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserProvider";
import { BiUpvote } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import GetAlllVotes from "../votes/GetAlllVotes";
import Loading from "../Loading/Loading";
import AddComment from "../Comments/AddComment";

const SingleFeatures = () => {
  const [singleFeature, setSingleFeature] = useState({});
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleFeatures(id);
        setSingleFeature(response.data);
        setEditTitle(response.data.title);
        setEditDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching single feature:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditFeature = async () => {
    try {
      // Perform the edit feature API call
      const updatedFeature = await editFeature(id, {
        title: editTitle,
        description: editDescription,
      });

      // Update the local state with the updated feature
      setSingleFeature(updatedFeature.data);
      toast.success(`Feature updated successfully`);
      // Close the modal
      document.getElementById("edit_modal").close();
    } catch (error) {
      console.error("Error editing feature:", error);
    }
  };

  const handleDeleteFeature = async () => {
    try {
      // Show confirmation modal here
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this feature?"
      );
      if (confirmDelete) {
        await deleteFeature(id);
        // Redirect or navigate to the feature list page after deletion
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  return (
    <div className="flex justify-around py-4 ">
      <div>
        {singleFeature ? (
          <>
            <Link to="/">
              <h3 className="text-base p-2 border-2 rounded flex items-center">
                <FaLongArrowAltLeft />
                Back to all posts
              </h3>
            </Link>
            <GetAlllVotes
              singleFeature={singleFeature}
              setSingleFeature={setSingleFeature}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
      <div>
        <div className="flex items-center">
          <p className="flex flex-col items-center border-2 p-1 rounded">
            <span>
              <BiUpvote />{" "}
            </span>
            {singleFeature.votes ? singleFeature.votes.length : 0}
          </p>
          <h2 className="text-gray text-2xl font-medium ml-2">
            Title: {singleFeature.title}
          </h2>
        </div>
        <h3 className="text-xl font-medium">Name: {singleFeature.user?.username || 'Unknown User'} </h3>
        {console.log('Single feature', singleFeature)}

        <p>Description: {singleFeature.description}</p>
       
        <p className="text-gray-500">
          Created on: {new Date(singleFeature.createdAt).toLocaleString()}
        </p>
        {user &&singleFeature.user && user._id===singleFeature.user._id && (
         
          <div className="flex items-center my-2 text-center ">
            <div className="text-xl font-medium">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("edit_modal").showModal()
                }
              >
                <FaEdit />
              </button>
              <dialog id="edit_modal" className="modal">
                <div className="modal-box bg-secondary">
                  <h3 className="font-bold text-lg pb-4">Edit Feature</h3>
                  <label className="block  text-xl font-bold text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <label className="block text-xl font-bold text-gray-700 mt-4">
                    Description
                  </label>
                  <textarea
                    className="textarea"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></textarea>
                  <div className="mt-4 flex justify-end">
                    <button className="btn btn-primary" onClick={handleEditFeature}>
                      Save
                    </button>
                    <button
                      className="btn ml-2 btn-primary"
                      onClick={() =>
                        document.getElementById("edit_modal").close()
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
            <div className="text-xl ml-2">
              <button className="btn" onClick={handleDeleteFeature}>
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        )}
        <AddComment singleFeature={singleFeature} setSingleFeature={setSingleFeature}/>
      </div>
    </div>
  );
};

export default SingleFeatures;
