import { Link } from "react-router-dom";

// import HomePageImage from '../../src/assets/homepageimage.png';
import HomePageImage from '../assets/homepageimage.png'
import HomeLayout from "../Layouts/HomeLayout";
function HomePage() {
    return (
        <>
            <HomeLayout>
                <div className=" pt-20 md:pt-10 lg:pt-10 pb-20  text-white flex justify-center items-center gap-10 md:flex-row lg:flex-row flex-col-reverse mx-16 md:h-[95vh] lg:h-[95vh]">
                    <div className=" w-fit md:w-1/2 lg:w-1/2 space-y-6 ">
                        <h1 className="text-5xl font-semibold">
                            Find out best
                            <span className="text-yellow-500 font-bold ml-2  ">
                                Online Courses
                            </span>
                        </h1>
                        <p className=" text-xl text-gray-200 ">
                            We have a large labrary of courses taught by highly skilled and qualified faculties at a very affordable cost.
                        </p>

                        <div className="  flex justify-start items-center gap-10 flex-col md:flex-row lg:flex-row">

                            <Link to={"/course"}>
                                <button className=" py-3 px-5 text-lg font-semibold bg-yellow-600 rounded-md hover:bg-yellow-800 transition-all duration-200 ease-in-out flex justify-center items-center">Explore courses</button>
                            </Link>


                            <Link to={"/contactUs"}>
                                <button className=" py-3 px-5 text-lg font-semibold border border-yellow-600 rounded-md hover:bg-yellow-600 transition-all duration-200 ease-in-out flex justify-center items-center">
                                    Contact Us
                                </button>
                            </Link>

                        </div>


                    </div>
                    <div className="w-fit md:w-1/2 lg:w-1/2 flex justify-center items-center">
                        <img src={HomePageImage} alt="HomePageImage" />
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
export default HomePage;