import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsFillXCircleFill } from "react-icons/bs";

function CheckoutRazorpayFail() {

    const navigate = useNavigate();

    return (
        <>
            <HomeLayout>

                <div className="min-h-[90vh] flex justify-center items-center text-white">
                    <div className="w-80 h-[23rem] rounded shadow-[0_0_10px_black] relative p-3 flex flex-col justify-center items-center gap-3">
                        <div className=" inline-block bg-white rounded-full">
                            <BsFillXCircleFill size={"6rem"} className="text-red-500" />
                        </div>
                        <h1 className="text-2xl text-red-500 font-bold tracking-wider">Sorry :(</h1>
                        <p className="text-gray-300 font-semibold line-clamp-3 text-center">Something went wrong please try again!!.</p>
                        <button onClick={() => navigate("/user/subscribe")} className="text-gray-300 font-semibold py-2 px-7 bg-red-500  my-4 rounded-md hover:bg-red-700 transition-all ease-in-out duration-300">
                            Try again
                        </button>
                    </div>

                </div>
            </HomeLayout>
        </>
    );

}
export default CheckoutRazorpayFail;