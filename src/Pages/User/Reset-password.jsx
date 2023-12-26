import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstances";
import { Navigate, useParams } from "react-router-dom";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const {resetToken} = useParams();
    console.log(resetToken)
    function handleUserInput(e) {
        const { name, value } = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value
        })
    }

    // backend call 
    async function resetPassword(event) {
        event.preventDefault();

        if(!newPassword.newPassword || !newPassword.confirmPassword){
            toast.error('All fields are required');
            return
        }

        // check newPassword and confirm password iscorect or not 
        if(newPassword.newPassword !== newPassword.confirmPassword){
            toast.error('Your password and confirm password is does not match.');
            return;
        }

        //backend call 
         try{
            const data = {
                password:newPassword.newPassword
            }
             const res =  axiosInstance.post(`/user/reset-password/${resetToken}`,data);
             toast.promise(res,{
                 loading:'Wait password is reset',
                 success:'Password reset successfully',
                 error:'Failed to reset your password'
             })
             console.log('response of reset password',res)

             Navigate('/');

         }catch(error){
            toast.error(error?.response?.data?.message);
         }
    }

    return (
        <>
            <HomeLayout>
                <div className="min-h-[90vh] flex justify-center items-center text-white ">
                    {/* container */}
                    <div className="px-4 py-5 shadow-[0px_0px_15px_rgba(0,0,0,0.3)]">

                        <form noValidate onSubmit={resetPassword} className="flex flex-col justify-center items-start gap-3">

                            <div>
                                <label htmlFor="password">New Password</label>
                                <br />
                                <input
                                    type="password"
                                    required
                                    name="newPassword"
                                    placeholder="enter new password"
                                    onChange={handleUserInput}
                                    value={newPassword.newPassword}
                                    className="py-1 px-2 rounded-md my-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Confirm Password</label>
                                <br />
                                <input
                                    type="password"
                                    required
                                    name="confirmPassword"
                                    placeholder="enter confirm password"
                                    onChange={handleUserInput}
                                    value={newPassword.confirmPassword}
                                    className="py-1 px-2 rounded-md my-2"
                                />
                            </div>
                            <div>
                                <button type="submit" className="bg-yellow-500 rounded 
                                cursor-pointer font-semibold py-1 px-14 hover:bg-yellow-600 transition-all ease-in-out">Reset Password</button>
                            </div>
                        </form>

                    </div>

                </div>
            </HomeLayout>
        </>
    )
}

export default ResetPassword;