import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';




const NavBar = () => {

const user = useSelector((store)=>store.user);
const dispatch = useDispatch();
const navigate = useNavigate();
const handleLogout = async ()=>{
  try{
   await axios.post(BASE_URL + "/logout", {},{withCredentials: true});
    dispatch(removeUser());
    return navigate("/login")
  } catch (err){
    //Error logic
  }
}

  return (
//    <div className="navbar bg-base-300 shadow-sm">
//   <div className="flex-1">
//     <a className="btn btn-ghost text-xl"> 📚💻Collabhub</a>
//   </div>
//   <div className="flex gap-2">
//     {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
//     <div className="dropdown dropdown-end mx-5">
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//         {user && (
            
//             <div className="w-10 rounded-full">
            
//           <img
//             alt="user photo"
//             src={user.photoUrl} />
//         </div>)}
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         <li>
//           <a className="justify-between">
//             Profile
//             <span className="badge">New</span>
//           </a>
//         </li>
//         <li><a>Settings</a></li>
//         <li><a>Logout</a></li>
//       </ul>
//     </div>
//   </div>
// </div>
<div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">📚💻Collabhub</Link>
  </div>

  {user && (
    <div className="flex items-center gap-4">
      {/* Welcome message */}
      <span className="text-sm md:text-base font-medium">
        Welcome, {user.firstName}
      </span>

      {/* Profile Dropdown */}
      <div className="dropdown dropdown-end mx-2">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          {user.photoUrl ? (
            <div className="w-10 rounded-full overflow-hidden">
              <img
                alt="User profile"
                src={user.photoUrl}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral text-white flex items-center justify-center">
              {user.firstName?.[0] || "U"}
            </div>
          )}
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/requests">Connection Requests</Link></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
  )}
</div>


  )
}

export default NavBar
