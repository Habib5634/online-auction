'use client'


// import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'



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


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError("")

        try {
            let response;
            switch (mode) {
                case MODE.REGISTER:
                    //   response = await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
                    break;
                case MODE.LOGIN:
                    //   response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
                    console.log(response)
                    localStorage.setItem("token", response.data.token)
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
            router.push('/'); // Redirect on success (example)
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };





    return (
        <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1] flex justify-center items-center h-full '>
            <form className="flex flex-col gap-8 bg-bluegray bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-2xl  w-full max-w-2xl p-6"
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
                                    name="username"
                                    placeholder="john"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Full Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="john"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </>
                    ) : null}

                    {mode !== MODE.EMAIL_VERIFICATION ? (
                        <div className="flex flex-col gap-2">
                            <label className="text-18 text-purpledark ">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@gmail.com"
                                className="ring-2 ring-purple rounded-md p-4"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <label className="text-18 text-purpledark ">Verification Code</label>
                            <input
                                type="text"
                                name="emailCode"
                                placeholder="Code"
                                className="ring-2 ring-purple rounded-md p-4"
                                onChange={(e) => setEmailCode(e.target.value)}
                            />
                        </div>
                    )}

                    {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                        </>
                    ) : null}
                    {mode === MODE.REGISTER && (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Address</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Contact</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Gender</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="ring-2 ring-purple rounded-md p-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-18 text-purpledark ">Role</label>
                                <div className='flex gap-5 items-center'>

                                    <div className='flex gap-4 py-4'>
                                        <label htmlFor="seller">Seller</label>
                                        <input
                                            type="radio"
                                            name="seller"

                                            className=""
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex gap-4 py-4'>
                                        <label htmlFor="buyer">Buyer</label>
                                        <input
                                            type="radio"
                                            name="buyer"

                                            className=""
                                            onChange={(e) => setPassword(e.target.value)}
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