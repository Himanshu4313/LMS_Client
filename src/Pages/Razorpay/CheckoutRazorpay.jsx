import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getRazorpayId, purchaseCourseBundal, varifyUserPayment } from "../../Redux/Slice/RazorpaySlice";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const isPaymentVarified = useSelector((state) => state?.razorpay?.isPaymentVarified);
    const userData = useSelector((state) => state?.auth?.data);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: "",
    }

    async function handleSubscription(e) {
        e.preventDefault();

        if (!razorpayKey || !subscription_id) {
            toast.error("Something went wrong..");
            return;
        }

        const option = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            discription: "Subscription",
            theme: {
                color: "#F37254",
            },
            prefill: {
                email: userData.email,
                name: userData.fullName,
            },
            handler: async (response) => {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id,
                    paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id,
                    paymentDetails.razorpay_signature = response.razorpay_signature,


                    toast.success("Payment successfully");

               const res =  await dispatch(varifyUserPayment(paymentDetails));
                (res?.payload?.success) ? navigate("/checkout/success") : navigate("/checkout/failed");

            }

        }

        const paymentObject = new window.Razorpay(option);
        paymentObject.open();

    }

    async function load() {
        await dispatch(getRazorpayId());
        await dispatch(purchaseCourseBundal());
    }

    useEffect(() => {
        load();
    }, [])
    return (
        <>
            <HomeLayout>
                <form
                    onSubmit={handleSubscription}
                    className="min-h-[90vh] flex flex-col justify-center items-center text-white">
                    <div className="w-80 md:w-96 lg:w-96 h-[26rem] flex flex-col justify-center items-center relative shadow-[0_0_10px_black] rounded p-2">
                        <h1
                            className="text-center py-4 px-1 bg-yellow-600 font-semibold text-xl absolute top-0 w-full rounded-tl-md rounded-tr-md"
                        >Subscription bundle</h1>

                        <div className=" space-y-4 text-center ">
                            <p>
                                This purchase will you to access all available course of our platform  for
                                <br />
                                <span className="text-yellow-500 font-bold">1 Year duration</span>{" "}
                                All the existing and new launched courses will be also available.
                            </p>

                            <p className="text-yellow-500 text-2xl font-bold flex justify-center items-center">
                                <BiRupee /><span>499/-</span> &nbsp; only
                            </p>

                            <p>100% refund on cancellation</p>
                            <p>*Terms and conditions applied*</p>
                        </div>
                        <button type="submit" className="bg-yellow-600 text-lg font-semibold py-2 absolute bottom-0 w-full rounded-bl-md rounded-br-md hover:bg-yellow-500 transition-all ease-in-out duration-300">
                            Buy Now
                        </button>
                    </div>
                </form>
            </HomeLayout>
        </>
    );
}
export default Checkout;