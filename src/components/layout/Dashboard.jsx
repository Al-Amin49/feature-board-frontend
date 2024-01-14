import { Link } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <h3>dashboard</h3>
            <Link to ="/dashboard/allusers"><button>Allusers</button></Link>
        </div>
    );
};

export default Dashboard;