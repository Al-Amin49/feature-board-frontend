import { useEffect, useState } from "react";
import { deleteFeature, getAllFeatures, updateFeatureStatus } from "../../api/Features";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const Features = () => {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchAllFeatures = async (newPage) => {
    try {
        setLoading(true)
      const response = await getAllFeatures({ page: newPage });
      setFeatures(response.data.features);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log("Changing page to", newPage);
      setCurrentPage(newPage);
      setLoading(true);
      await fetchAllFeatures(newPage);
    }
  };
  useEffect(() => {
    fetchAllFeatures(currentPage);
  }, [currentPage]);

  const handleUpdateStatus = async (feature, status) => {
    try {
      if (!feature.status) {
        console.log("Please select a new status");
        // return;
      }
      console.log('status', status)
     
      const updatedData = {
        status
      };
      console.log("Updating status with data:", updatedData);
      // Assuming feature._id is the ID of the feature you want to update
      const response = await updateFeatureStatus(feature, updatedData);
      console.log("update status", response);

      // Assuming your API returns the updated feature
      const updatedFeature = response.data;
      console.log('updated feature', updatedFeature)
      toast.success("Update status successfully");

      // Update the state with the updated feature
      setFeatures((prevFeatures) =>
        prevFeatures.map((f) =>
          f._id === updatedFeature._id ? updatedFeature : f
        )
      );
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const handleDeleteFeature = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "to deleted this feature ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteFeature(id);
        // Update the state to remove the deleted user from the UI
        setFeatures((prevFeatures) => prevFeatures.filter((f) => f._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error deleting user:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the user.",
        icon: "error",
      });
    }
  };
  return (
    <div>
        {loading ? <Loading/> : 
        <>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              {/* <th></th> */}
              <th>Title</th>
              <th>Request time</th>
              <th>Update Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
                // const rowNumber = (currentPage - 1) * features.length + index + 1;
              <tr key={feature._id}>
                {/* <th>{index+1}</th> */}
                <td>{feature.title}</td>
                <td>{new Date(feature.createdAt).toLocaleString()}</td>
                <td>
                  <select
                    value={feature.status || ""}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setFeatures((prevFeatures) =>
                        prevFeatures.map((f) =>
                          f._id === feature._id
                            ? { ...f, status: newStatus }
                            : f
                        )
                      );
                    }}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Under Review">Under Review</option>
                    <option value="Planned">Planned</option>
                    <option value="Complete">Complete</option>
                    <option value="In progress">In progress</option>
                    <option value="New">New</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(feature._id, feature.status)}
                    className="btn btn-lg bg-orange-500"
                  >
                    Update Status
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleDeleteFeature(feature._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        </>
        }
    </div>
  );
};

export default Features;
