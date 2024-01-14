import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/User";


const AllUsers = () => {
    const [users, setUsers]= useState([]);

    const fetchAllUsersData = async () => {
        try {
        
          const response = await getAllUsers();
          console.log('user data ', response.data)
          setUsers(response.data);
        } catch (error) {
          console.log("error", error);
        } 
      };
    
    useEffect(()=>{
        fetchAllUsersData()
    }, [])
    return (
        <div>
            <h3>all users</h3>
            <h4>{users.length}</h4>
        </div>
    );
};

export default AllUsers;