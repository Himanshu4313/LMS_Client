import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstances";
import { data } from "autoprefixer";

function ForgotPassword() {

  const [email, setEmail] = useState({
    email: ""
  })

  function handleUserInput(e) {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value
    })
  }

  async function handleForgotPassword(event) {
    event.preventDefault();

    if (!email) {
      toast.error('Email is mandatroy');
    }
    try {
      const res = axiosInstance.post('/user/forgot-password', email);
      toast.promise(res, {
        loading: "Wait reset-password email is send to your email address",
        success: `Reset password token has been sent to successfully.`,
        error: "Failed to forgot your password"
      });

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  }
  return (
    <>
      <HomeLayout>
        <div className="h-[90vh] flex flex-col justify-center items-center">
          <div className="px-4 py-8 m-6 shadow-[0px_0px_15px_rgba(0,0,0,0.3)] text-white ">
            <form noValidate onSubmit={handleForgotPassword} className="flex flex-col justify-center items-start gap-2">
              <div>

                <label htmlFor="email" className="">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter your email"
                  required
                  onChange={handleUserInput}
                  value={email.email}
                  className="py-1 px-1 my-2 rounded-md w-[237px]"
                />
              </div>
              <button type="submit" className="bg-yellow-500 rounded 
                                cursor-pointer font-semibold py-1 px-14 hover:bg-yellow-600 transition-all ease-in-out">ForgotPassword</button>
            </form>
          </div>
        </div>
      </HomeLayout>
    </>
  )
}
export default ForgotPassword;