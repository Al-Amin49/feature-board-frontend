
import { FaUsers } from "react-icons/fa6";
import { useAuth } from "../../context/UserProvider";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/User";
import { getAllFeatures, getAllVoters } from "../../api/Features";

const AdminHome = () => {
  const { user } = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFetures, setTotalFeatures] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);
  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      console.log('users', users.data.length)
      setTotalUsers(users.data.length); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchAllFeatures = async () => {
    try {
      const features = await getAllFeatures();
      setTotalFeatures(features.data.features.length); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchAllVoters = async () => {
    try {
      const voters = await getAllVoters();
      console.log('voters', voters)
      setTotalVoters(voters.length); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchAllFeatures();
    fetchAllVoters();
  }, []);
  return (
    <div className="">
      <h3 className="text-2xl text-center">
        Hi, <span className="font-bold py-4">{user.username}</span> Welcome Back
      </h3>
      <div className="flex flex-row justify-center pt-4">
      <div className="stats stats-vertical lg:stats-horizontal shadow ">
        <div className="stat">
         
          <div className="stat-title flex items-center"> <FaUsers className="text-warning mx-1"/>Total Users</div>
          <div className="stat-value text-center">{totalUsers}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Features</div>
          <div className="stat-value text-center">{totalFetures}</div>
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
