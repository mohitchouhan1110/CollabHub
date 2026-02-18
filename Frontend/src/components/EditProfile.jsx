import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import UserCard from './UserCard';


const EditProfile = ({user}) => {
    const [firstName , setFirstName] = useState(user.firstName);
    const [lastName , setLastName] = useState(user.lastName);
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [age,setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const saveProfile = async ()=>{
        setError("");
        try{
            const res = await axios.patch(BASE_URL+"/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },
                { withCredentials: true}
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false);
            },3000);
        } catch(err){
            setError(err.response.data)
        }
    };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
//     <div>
//       <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
//       <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-8">
//         <h1 className="text-3xl font-bold text-center text-primary mb-2"> Collabhub 🔥</h1>
//         <p className="text-center text-sm text-gray-500 mb-6">Edit Profile</p>

//         {/* Email Field */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">First Name </label>
//           <input
//             value={emailId}
//             type="email"
//             placeholder="you@dev.com"
//             className="input input-bordered w-full"
//             onChange={(e)=>setEmailId(e.target.value)}
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Last Name</label>
//           <input
//           value={password}
//             type="password"
//             placeholder="••••••••"
//             className="input input-bordered w-full"
//             onChange={(e)=>setPassword(e.target.value)}
//           />
//         </div>
//            {/* {ERROR MESSAGE} */}
//            <p className="text-red-500">{error}</p>
//         {/* Login Button - Centered */}
//         <div className="flex justify-center">
//           <button className="btn btn-primary w-1/2" >Login</button>
//         </div>

//         {/* Sign Up */}
//         <p className="text-sm text-center mt-6">
//           Don't have an account? <a className="link link-primary">Sign Up</a>
//         </p>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default EditProfile
