import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../Helpers/axiosInstances";

function ChangePassword() {

     const navigate = useNavigate();
    const [password , setPassword] = useState({
        oldPassword:"",
        newPassword:""
    });

    function handleUserInput(e){
        const {name , value} = e.target;
        setPassword({
            ...password,
            [name]:value
        })
    }
    // console.log(password.oldPassword , password.newPassword);
    
    async function handleChangePassword(event) {
         event.preventDefault();

         if(!password.oldPassword || !password.newPassword){
            toast.error("All fields are required");
            return ;
         }

          const data = {
            oldPassword:password.oldPassword,
            newPassword:password.newPassword,
          }
        console.log('password',data)
         try {
              const response = axiosInstance.post('/user/change-password',data);
              const resData = (await response).data;
              console.log('=>',resData);
              toast.promise(response,{
                loading:'Wait changing your password',
                success:'Password change successfully',
                error:'Failed to change your password'
              });
         } catch (error) {
            toast.error(error?.response?.data?.message);
         }
      
        setPassword({
            oldPassword:"",
            newPassword:"",
        })

        navigate('/user/profile');
    }
    return (
        <>
            <HomeLayout>

                <div className="min-h-[90vh] flex justify-center items-center text-white">
                    <div className="px-5 py-7 shadow-[0px_0px_15px_rgba(0,0,0,0.3)]">

                        <form noValidate onSubmit={handleChangePassword} className="flex flex-col justify-center items-start gap-3">

                            <div>
                                <label htmlFor="password">Old Password</label>
                                <br />
                                <input
                                    type="password"
                                    required
                                    name="oldPassword"
                                    placeholder="enter old password"
                                    onChange={handleUserInput}
                                    value={password.oldPassword}
                                    className="py-1 px-2 rounded-md my-2 w-72"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">New Password</label>
                                <br />
                                <input
                                    type="password"
                                    required
                                    name="newPassword"
                                    placeholder="enter new password"
                                    onChange={handleUserInput}
                                    value={password.newPassword}
                                    className="py-1 px-2 rounded-md my-2 w-72"
                                />
                            </div>
                            <div>
                                <button type="submit" className="bg-yellow-500 rounded 
                                        cursor-pointer font-semibold py-1 px-14 hover:bg-yellow-600 transition-all ease-in-out w-72">Change Password</button>

                                        <p className="my-5 text-center"><Link to={'/user/profile'} className=" text-green-500 px-1 py-1 font-medium border rounded-md ">Go to back</Link></p>
                            </div>
                        </form>

                    </div>
                </div>

            </HomeLayout>
        </>
    )

}

export default ChangePassword;