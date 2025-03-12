'use client'


import { API_URL } from '@/utils/apiUrl';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';



const MODE = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    RESET_PASSWORD: "RESET_PASSWORD",
    EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
}
const Login = () => {
    const BASE_URL = 'http://localhost:8080/api/v1'
    const router = useRouter();
    const [mode, setMode] = useState(MODE.LOGIN);


    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [fullName, setFullName] = useState("")
    // const [address, setAddress] = useState("")
    // const [contact, setContact] = useState("")
    // const [gender, setGender] = useState('')
    // const [role, setRole] = useState('')
    // const [emailCode, setEmailCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        emailCode: "",
        fullName: "",
        address: "",
        gender: "",
        contact: "",
        emailCode: "",
        userType: "buyer",
        answer: "",
    });

    const pathname = usePathname()
    // if (isLoggedIn) {
    //   router.push("/");
    // }
    const formTitle =
        mode === MODE.LOGIN
            ? "Log in"
            : mode === MODE.REGISTER
                ? "Register"
                : mode === MODE.RESET_PASSWORD
                    ? "Reset Your Password"
                    : "Verify Your Email";

    const buttonTitle =
        mode === MODE.LOGIN
            ? "Login"
            : mode === MODE.REGISTER
                ? "Register"
                : mode === MODE.RESET_PASSWORD
                    ? "Reset"
                    : "Verify";



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError("")

        try {
            let response;
            switch (mode) {
                case MODE.REGISTER:
                    response = await axios.post(`${API_URL}/auth/register`, formData);
                    console.log(response)
                    if (response.status === 201) {
                        toast.success("Registered Successfully")
                        setMode(MODE.LOGIN)
                        console.log("FormData Data:", formData);
                    } else {
                        toast.error("Something went wrong")
                    }
                    break;
                case MODE.LOGIN:
                    response = await axios.post(`${API_URL}/auth/login`, { email: formData.email, password: formData.password });

                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.token)
                        if (response?.data?.user?.userType === "admin") {
                            router.push('/admin-dashboard')
                        } else {
                            router.push('/')
                        }
                        toast.success("Login Successfully")
                    } else {
                        toast.error("Something went wrong")
                    }


                    break;
                case MODE.RESET_PASSWORD:
                    //   response = await axios.post(`${BASE_URL}/user/reset-password`, { email, emailCode, password });
                    break;
                case MODE.EMAIL_VERIFICATION:
                    //   response = await axios.post(`${BASE_URL}/user/verify-email`, { email, emailCode });
                    break;
                default:
                    throw new Error('Invalid mode');
            }

            //   setMessage(response.data.message);
            // router.push('/'); // Redirect on success (example)
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };





    return (
        <div className=' max-w-[1440px] mx-auto w-full mt-[100px] gap-5 relative z-[0.1] flex justify-center   '>
            <form className="flex flex-col gap-8 overflow-y-auto h-full max-h-[calc(100vh-150px)] bg-bluegray bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-2xl  w-full max-w-2xl p-6"
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-semibold text-purple">{formTitle}</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4'>
                    {mode === MODE.REGISTER ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Username</label>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="john"
                                    value={formData?.userName}
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="john"
                                    value={formData?.fullName}
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    ) : null}

                    {mode !== MODE.EMAIL_VERIFICATION ? (
                        <div className={`${mode === MODE.LOGIN ? 'col-span-2' : ''} flex flex-col gap-2`}>
                            <label className="text-18 text-purpledark ">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@gmail.com"
                                value={formData?.email}
                                className="ring-2 ring-purple rounded-md p-4"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <label className="text-18 text-purpledark ">Verification Code</label>
                            <input
                                type="text"
                                name="emailCode"
                                placeholder="Code"
                                value={formData?.emailCode}
                                className="ring-2 ring-purple rounded-md p-4"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
                        <>
                            <div className={`${mode === MODE.LOGIN ? 'col-span-2' : ''} flex flex-col gap-2`}>
                                <label className="text-18 text-purpledark ">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </>
                    ) : null}
                    {mode === MODE.REGISTER && (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter your Address"
                                    value={formData?.address}
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Contact</label>
                                <input
                                    type="number"
                                    name="contact"
                                    placeholder="Enter your Contact"
                                    value={formData?.contact}
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark">Gender</label>
                                <select
                                    name="gender"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled selected>
                                        Select your gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark">Role</label>
                                <div className="flex gap-5 flex-col items-start">
                                    <div className="flex gap-4 ">
                                        <label htmlFor="buyer" className='font-bold'>Buyer</label>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="buyer" // Set value explicitly
                                            className=""
                                            checked={formData.userType === "buyer"}
                                            onChange={handleChange} // This will now set the role to "seller"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <label htmlFor="seller" className='font-bold'>Seller</label>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="seller" // Set value explicitly
                                            className=""
                                            checked={formData.userType === "seller"}
                                            onChange={handleChange} // This will now set the role to "buyer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
                {mode === MODE.LOGIN && (
                    <div
                        className="text-18 underline cursor-pointer"
                        onClick={() => setMode(MODE.RESET_PASSWORD)}
                    >
                        Forgot Password?
                    </div>
                )}
                <button
                    className="bg-purple text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : buttonTitle}
                </button>
                {error && <div className="text-red-600">{error}</div>}
                {mode === MODE.LOGIN && (
                    <div
                        className="text-18 underline cursor-pointer"
                        onClick={() => setMode(MODE.REGISTER)}
                    >
                        {"Don't"} have an account?
                    </div>
                )}
                {mode === MODE.REGISTER && (
                    <div
                        className="text-18 underline cursor-pointer"
                        onClick={() => setMode(MODE.LOGIN)}
                    >
                        Have and account?
                    </div>
                )}
                {mode === MODE.RESET_PASSWORD && (
                    <div
                        className="text-18 underline cursor-pointer"
                        onClick={() => setMode(MODE.LOGIN)}
                    >
                        Go back to Login
                    </div>
                )}
                {message && <div className="text-purple-600 text-18">{message}</div>}


            </form>
        </div>
    )
}

export default Login