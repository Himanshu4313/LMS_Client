import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import {  login } from "../Redux/Slice/AuthSlice";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [logindata, setLoginData] = useState({

        email: "",
        password: "",

    })

    // handle user input

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...logindata,
            [name]: value
        })
    }

    // hadle login account 

    async function logIn(event) {
        event.preventDefault();
        if (!logindata.email || !logindata.password) {
            toast.error('Please fill all the details');
            return;
        }


        const loginData = new FormData();
        loginData.append("email", loginData.email);
        loginData.append("password", loginData.password);


        //dispatch login account action
        const response = await dispatch(login(loginData));
        if (response?.payload?.success) {

            navigate("/");
        }



        setLoginData({

            email: " ",
            password: " ",

        })



    }
    return (
        <>
            <HomeLayout>

                <div className="flex justify-center items-center min-h-[90vh]">

                    <div className=" py-4 px-10 shadow-[0px_0px_15px_rgba(0,0,0,0.3)]  text-white">
                        <form noValidate onSubmit={logIn} className="flex flex-col justify-start items-center gap-3">
                            <h1 className="text-white text-2xl font-bold">Login Page</h1>

                            <div>
                                <label htmlFor="email">Email</label>
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email.."
                                    id="email"
                                    required
                                    className="py-1 pl-1 pr-14 rounded border "
                                    onChange={handleUserInput}
                                    value={logindata.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password.."
                                    id="password"
                                    required
                                    className="py-1 pl-1 pr-14 rounded border "
                                    onChange={handleUserInput}
                                    value={logindata.password}
                                />
                            </div>
                            <div>
                                <button type="submit" className="bg-yellow-500 rounded 
                                cursor-pointer font-semibold py-1 px-14 hover:bg-yellow-600 transition-all ease-in-out">Login</button>
                            </div>
                            <p>Donot have an account ? <Link to={"/signup"} className="link text-green-500">SignUp</Link></p>
                        </form>
                    </div>
                </div>
            </HomeLayout>

        </>
    );
}
export default LoginPage;