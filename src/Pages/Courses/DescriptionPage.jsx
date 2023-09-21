import { useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function Description() {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    return (
        <>
            <HomeLayout>
                <div className="w-full h-[90vh] flex  justify-center items-center flex-col py-10 px-5">
                    <div className="grid grid-cols-2 gap-10 py-10 relative">
                        {/* Image part  */}
                        <div className="flex justify-center items-center flex-col gap-2">

                            <img
                                src={state?.thumbnail?.secure_url}
                                alt="thumbnailImage"
                                className="w-full h-64"
                            />
                            <div className="space-y-4">
                                <div className="flex flex-col justify-center items-center gap-1 text-white">

                                    <p className="font-semibold ">
                                        <span className="text-xl font-bold text-yellow-500">Total lecture : {"  "}</span>
                                        {/* {state?.numberoflecture} */}6
                                    </p>
                                    <p className="font-semibold ">
                                        <span className="text-xl font-bold text-yellow-500">Instructor : {"  "}</span>
                                        {/* {state?.createdBy} */} Vishwa Mohan
                                    </p>
                                    {role === "ADMIN" || data?.subscription?.status === "active" ? (

                                             <button
                                             onClick={() => navigate("/course/displaylectures", {state: {...state}})}
                                            className="py-3 px-5 bg-yellow-500 w-full text-xl font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-300  text-white rounded-md">
                                            Watch Lecture</button>

                                    ) : (
                                        <button
                                           onClick={() => navigate("/user/subscribe")}
                                            className="py-3 px-5 bg-yellow-500 w-full text-xl font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-300 text-white rounded-md">
                                            Subscribe</button>
                                    )

                                    }
                                </div>
                            </div>
                        </div>
                        {/* course details */}
                        <div className="flex flex-col justify-center  items-center gap-2 text-white ">
                            <h1>
                                <span className="text-yellow-500 font-bold text-2xl">Course Title :</span>
                                {state?.title}
                            </h1>
                            <p className="text-yellow-500 font-bold text-2xl">Course Description : </p>
                            {/* <p>{state?.description}</p> */}
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit vel perspiciatis quia facilis debitis ad cum. Consequatur minima architecto vero delectus beatae quis incidunt perferendis reiciendis aliquid repellat sed voluptatum fuga quaerat veritatis quasi maiores eos corrupti commodi, voluptas labore enim assumenda quibusdam. </p>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        </>
    );

}
export default Description;