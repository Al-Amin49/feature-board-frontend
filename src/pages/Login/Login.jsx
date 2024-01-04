import { Link } from 'react-router-dom';
import signinImg from '../../assets/img/login.png';
const Login = () => {
  return (
    <>
    <div className="hero bg-secondary ">
  <div className="hero-content flex-col lg:flex-row">
    <div className="">
    <img src={signinImg} className='' alt="" />
    </div>
    <div className="card shrink-0 ml-10 w-full max-w-md shadow-2xl ">
      <h2 className='text-2xl text-center font-medium'>Login</h2>
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email*</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password*</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-2 ">
          <button className="btn btn-primary text-white w-1/2 mx-auto">Login</button>
        </div>
      </form>
      <p className='font-medium text-center py-2'>Don't Have a account. Creat an account <Link to="/signup"><span className='text-orange-700'>Signup</span></Link></p>
    </div>
  </div>
</div>
    </>
  );
};

export default Login;
