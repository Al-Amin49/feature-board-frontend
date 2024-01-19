import { FaHome, FaUsers } from "react-icons/fa";
import {  Link, NavLink, Outlet } from "react-router-dom";
import logo from '../../assets/img/featureBoard.png';
const Dashboard = () => {
  return (
    <div>
       
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
          <h3 className="text-3xl flex flex-col justify-center items-center text-fuchsia-500 pt-4">
            <Link to="/"><img src={logo} className="w-24" alt="" /></Link>
          </h3>
          <ul className="menu p-4">
         
            <li>
              <NavLink to="/dashboard/adminHome">
                <FaHome></FaHome>
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/allusers">
                <FaUsers></FaUsers>
                All Users
              </NavLink>
            </li>

            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
