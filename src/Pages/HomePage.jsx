import { Link } from "react-router-dom";

import HomePageImage from '../assets/Image/homepageImage.png';
import HomeLayout from "../Layouts/HomeLayout";
function HomePage() {
    return (
        <>
            <HomeLayout>
                <div className="pt-10 text-white flex justify-center items-center gap-10 mx-16 h-[90vh]">
                    <div className="w-1/2 space-y-6">
                        <h1 className="text-5xl font-semibold">
                            Find out best
                            <span className="text-yellow-500 font-bold ml-2  ">
                                Online Courses
                            </span>
                        </h1>
                        <p className=" text-xl text-gray-200 ">
                            We have a large labrary of courses taught by highly skilled and qualified faculties at a very affordable cost.
                        </p>

                        <div className="  flex justify-start items-center gap-10">

                            <Link to={"/course"}>
                                <button className=" py-3 px-5 text-xl font-semi-bold bg-yellow-600 rounded-md hover:bg-yellow-800 transition-all duration-200 ease-in-out flex justify-center items-center">Explore courses</button>
                            </Link>


                            <Link to={"/contactUs"}>
                                <button className=" py-3 px-5 text-xl font-semi-bold border border-yellow-600 rounded-md hover:bg-yellow-600 transition-all duration-200 ease-in-out flex justify-center items-center">
                                    Contact Us
                                </button>
                            </Link>

                        </div>


                    </div>
                    <div className="w-1/2 flex justify-center items-center">
                        <img src={HomePageImage} alt="HomePageImage" />
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
export default HomePage;