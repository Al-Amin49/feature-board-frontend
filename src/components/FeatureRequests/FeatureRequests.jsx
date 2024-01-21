import { toast } from "react-toastify";
import { addFeature } from "../../api/Features";
import FeatureBoard from "./FeatureBoard";
import { useAuth } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import { useState } from "react";

const FeatureRequests = () => {
  const [features, setFeatures] = useState([]);
  const { loading, setLoading, user } = useAuth();
  const navigate = useNavigate();
 
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {
    const featureData = {
      title: data.title,
      description: data.description,
    };
    if (!user) {
      navigate('/login')
      return;
    }
    try {
      setLoading(true);
      const response = await addFeature(featureData);
      console.log("data", response);
      if (response && response.data) {
        // Update local state with the new feature
        setFeatures((prevFeatures) => [...prevFeatures, response.data.features]);
        reset();
        toast.success("Request added successfully", {
          position: "top-center",
        });
      } else {
        toast.error("Unexpected response from server", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error during request");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="hero ">
          <div className="hero-content flex-col lg:flex-row  items-start">
            <div className="sticky top-0 z-10">
              <div className="shadow-2xl border-2 px-10 py-4 border-spacing-2 text-center ">
                <h3>Feature Request</h3>
                <p>Let us know what features you&rsquo;d like to see</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text uppercase font-medium">
                        Title
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Short, descriptive title"
                      className="input input-bordered input-secondary"
                      {...register("title", { required: true })}
                    />
                    {errors.title && (
                      <span className="text-red-600">Title is required</span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text uppercase font-medium">
                        Details
                      </span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Any additional details"
                      className="input input-bordered input-secondary"
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <span className="text-red-600">
                        Description is required
                      </span>
                    )}
                  </div>
                  <button className="btn my-4 btn-primary">
                    Request Feature
                  </button>
                </form>
              </div>
            </div>
            <div className="pl-10">
              <FeatureBoard features={features} setFeatures={setFeatures} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureRequests;
