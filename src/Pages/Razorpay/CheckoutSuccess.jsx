import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slice/AuthSlice";

function CheckoutRazorpaySuccess() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    },[])

    return (
        <>
            <HomeLayout>

                <div className="min-h-[90vh] flex justify-center items-center text-white">
                    <div className="w-80 h-[23rem] rounded shadow-[0_0_10px_black] relative p-3 flex flex-col justify-center items-center gap-3">
                        <div className=" inline-block bg-white rounded-full">
                            <BsFillCheckCircleFill size={"6rem"} className="text-green-500" />
                       </div>
                        <h1 className="text-2xl text-green-500 font-bold tracking-wider">Success!</h1>
                        <p className="text-gray-300 font-semibold line-clamp-3 text-center">Your payments has been done successfully.</p>
                        <p className="text-gray-400 font-semibold line-clamp-3 text-center text-sm">Welcome to pro bundle , Now you can enjoy all the courses.</p>
                        <button onClick={() => navigate("/")} className="text-gray-300 font-semibold py-2 px-7 bg-green-500  my-4 rounded-md hover:bg-green-600 transition-all ease-in-out duration-300">
                            Continue
                        </button>
                    </div>

                </div>
            </HomeLayout>
        </>
    );

}
export default CheckoutRazorpaySuccess;