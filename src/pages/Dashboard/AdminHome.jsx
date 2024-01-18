
import { FaUsers } from "react-icons/fa6";
import { useAuth } from "../../context/UserProvider";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/User";
import { getAllFeatures, getTotalVotesCount } from "../../api/Features";
import { getTotalCommentsCount } from "../../api/Comments";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
const AdminHome = () => {
  const { user } = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFetures, setTotalFeatures] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
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
  const fetchAllVotersCount = async () => {
    try {
      const voters = await getTotalVotesCount();
    
      setTotalVoters(voters.data.totalCount); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchAllCommentsCount = async () => {
    try {
      const comments = await getTotalCommentsCount();
    
      setTotalComments(comments.data.totalCount); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchAllFeatures();
    fetchAllVotersCount();
    fetchAllCommentsCount();
  }, []);
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
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
          <div className="stat-title">Total Voters</div>
          <div className="stat-value">{totalVoters}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Comments</div>
          <div className="stat-value">{totalComments}</div>
        </div>
      </div>
      </div>
     <div className="py-10  flex justify-center items-center">
     <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
     </div>
    </div>
  );
};

export default AdminHome;
