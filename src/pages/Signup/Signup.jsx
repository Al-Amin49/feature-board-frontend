import { Link, useNavigate } from "react-router-dom";
import signUpImg from "../../assets/img/login.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signUpUser } from "../../api/User";
import Loading from "../../components/Loading/Loading";
import { useAuth } from "../../context/UserProvider";
const Signup = () => {
  const {setUser, loading, setLoading}= useAuth()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      setLoading(true)
      const response = await signUpUser(userData);
      if (response && response.data) {
        setUser(response.data)
        reset();
        navigate("/");
        toast.success("Register Successfully", {
          position: "top-center",
        });
      }
      else {
        // Handle unexpected response structure
        toast.error("Unexpected response from server", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error('Error during registration', {
        position: "top-center",
      });
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <>
   
   <div className="bg-secondary">
    {/* loading state */}
   {loading?<Loading/>: ""}
   <div className="hero ">
        <div className="hero-content flex-col lg:flex-row">
          <div className="">
            <img src={signUpImg} className="w-full" alt="" />
          </div>
          <div className="card shrink-0 ml-10 w-full max-w-md shadow-2xl ">
            <h2 className="text-2xl text-center font-medium">Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username*</span>
                </label>
                <input
                  type="text"
                  {...register("username", { required: true, minLength: 4 })}
                  placeholder="username"
                  className="input input-bordered"
                />
                {errors.username && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email*</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", {
                    required: true,
                  })}
                  className="input input-bordered"
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              {/* Password field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password*</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  })}
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be at least 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must be including one digit and one number
                  </span>
                )}
              </div>
              <div className="form-control mt-2 ">
                <button className="btn btn-primary text-white w-1/2 mx-auto">
                  Signup
                </button>
              </div>
            </form>
            <p className="font-medium text-center py-2">
              Already have an account Please{" "}
              <Link to="/login">
                <span className="text-orange-700">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default Signup;
