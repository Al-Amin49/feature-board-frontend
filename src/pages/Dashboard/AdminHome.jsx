
import { useAuth } from "../../context/UserProvider";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div className="">
      <h3 className="text-2xl text-center">
        Hi, <span className="font-bold py-4">{user.username}</span> Welcome Back
      </h3>
      <div className="flex flex-row justify-center pt-4">
      <div className="stats stats-vertical lg:stats-horizontal shadow ">
        <div className="stat">
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminHome;
