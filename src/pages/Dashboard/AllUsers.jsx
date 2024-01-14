import { useEffect, useState } from "react";
import { deletedUser, getAllUsers } from "../../api/User";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsersData = async () => {
    try {
      const response = await getAllUsers();
      console.log("user data ", response.data);
      setUsers(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, []);

  const handleMakeAdmin = () => {};
  //delete a user
  const handleDeleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "to deleted this user ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deletedUser(id);
        // Update the state to remove the deleted user from the UI
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error deleting user:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the user.",
        icon: "error",
      });
    }
  };

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
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-orange-500"
                    >
                      <FaUsers
                        className="text-white 
                                        text-2xl"
                      ></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-primary">Make Admin</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
