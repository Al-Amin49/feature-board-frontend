import { Link, useNavigate } from "react-router-dom";
import signinImg from "../../assets/img/login.png";
import { loginUser } from "../../api/User";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
  
    try {
      setLoading(true);
      const response = await loginUser(userData);
      console.log('Server Response:', response);
      if (response && response.data) {
        reset();
        navigate("/");
        toast.success("Login Successfully");
      } else if (response && response.message) {
        console.log('unexpected error from server', response)
        toast.error("User not found. Please check your email and password.");
      }
    } catch (error) {
      console.log('error during login', error)
      toast.error('User not found');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-secondary">
      {loading ? <Loading /> : ""}
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <div className="">
            <img src={signinImg} className="" alt="" />
          </div>
          <div className="card shrink-0 ml-10 w-full max-w-md shadow-2xl ">
            <h2 className="text-2xl text-center font-medium">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email*</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password*</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password")}
                  required
                />
              </div>
              <div className="form-control mt-2 ">
                <button className="btn btn-primary text-white w-1/2 mx-auto">
                  Login
                </button>
              </div>
            </form>
            {/*  eslint-disable-next-line react/no-unescaped-entities */}
            <p className="font-medium text-center py-2">
              Don't Have a account. Creat an account{" "}
              <Link to="/signup">
                <span className="text-orange-700">Signup</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
