import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import Loading from "../components/Loading/Loading";

const Header = () => {
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  if (loading || user) {
    <Loading />;
  }
  const handleLogout = () => {
    logOut();
    navigate("/");
  };


  const navItem = (
    <>
    <li>
        <Link to="/">Home</Link>
      </li>
      {user ? (
        <>
          {user.role === "admin" && (
            <li>
              <Link to="/dashboard/adminHome">Dashboard</Link>
            </li>
          )}
      
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>
      )}
      
    </>
  );

  return (
    <div>
      <div className="navbar bg-primary ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItem}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl text-fuchsia-500">
            CollaboBoard
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal -mr-56">{navItem}</ul>
        </div>
        <div className="navbar-end mr-8">
        {user && (
        <li className="text-center flex flex-row items-center mx-2 ">
          Welcome, {user.username}
        </li>
      )}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-8 rounded-full border-2 navbar-end">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-28 bg-warning"
        >
          <li>
            <Link to="/profile" className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
