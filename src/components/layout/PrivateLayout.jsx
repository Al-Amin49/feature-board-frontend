import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/UserProvider";
import Loading from "../Loading/Loading";



const PrivateLayout = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <Loading/>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateLayout;