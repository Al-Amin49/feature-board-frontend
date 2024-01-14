import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/User";
import { FaTrashAlt, FaUsers } from "react-icons/fa";


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

    const handleMakeAdmin=()=>{

    }
    const handleDeleteUser=()=>{

    }
    return (
        <div>
             <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Ban User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                  {user.role==='admin' ?'Admin' :<button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-lg bg-orange-500">
                                        <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                    <button className="btn btn-primary">Make Admin</button>
                                </td>
                                <td>
                                   <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;