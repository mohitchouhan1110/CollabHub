import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId , setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error,setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password,
            }, { withCredentials: true });

            console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/");
            
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId,
                password,
            }, { withCredentials: true });

            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-8">
                    <h1 className="text-3xl font-bold text-center text-primary mb-2"> Collabhub 🔥</h1>
                    <p className="text-center text-sm text-gray-500 mb-6">Connect. Collaborate. Code.</p>

                    {!isLoginForm && (
                        <>
                            {/* First Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="input input-bordered w-full"
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            {/* Last Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="input input-bordered w-full"
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            value={emailId}
                            type="email"
                            placeholder="you@dev.com"
                            className="input input-bordered w-full"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            value={password}
                            type="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    <p className="text-red-500">{error}</p>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            className="btn btn-primary w-1/2"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    {/* Toggle View */}
                    <p className="text-sm text-center mt-6 cursor-pointer" onClick={() => setIsLoginForm(prev => !prev)}>
                        {isLoginForm ? (
                            <>Don't have an account? <span className="link link-primary">Sign Up</span></>
                        ) : (
                            <>Already have an account? <span className="link link-primary">Login</span></>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
