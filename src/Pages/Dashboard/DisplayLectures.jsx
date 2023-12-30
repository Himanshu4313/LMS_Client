import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slice/LectureSlice";

function DisplayLectures() {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  lectures  = useSelector((state) => state?.lecture?.lectures);
    console.log('lectures array',lectures);
    const  role  = useSelector((state) => state?.auth?.role);

    const [currentVideo, setCurrentVideo] = useState(0);


    async function handleDeleteLecture(courseId, lectureId) {
        const data = {
            courseId: courseId,
            lectureId: lectureId,
        }
        await dispatch(deleteCourseLecture(data));
        await dispatch(getCourseLecture(courseId));
    }



    // UNCOMMENT WHEN I CREATE BACKEND PART OF THIS LMS  

    useEffect(() => {
        if(!state) {
            navigate("/course");
        }
         dispatch(getCourseLecture(state._id));
    },[])
    return (
        <>
            <HomeLayout>
                <div className="flex flex-col gap-10 justify-center items-center h-[100vh] text-white py-8  mx-4 ">
                    <div className="text-center text-lg md:text-2xl lg:text-2xl font-semibold text-yellow-500 ">
                        Course Name : {state.title}
                        
                    </div>
                    {lectures && (<div className="flex flex-wrap justify-center items-center gap-10 w-full">
                        {/* Left side for playing video  */}
                        <div className=" space-y-3 md:space-y-4 lg:space-y-4 w-[28rem]   rounded shadow-[0_0_10px_black] p-2  ">
                            <video
                                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                muted
                                controls
                                disablePictureInPicture
                                className="object-fill w-full"
                            >
                            </video>
                            <h1>
                                <span className="text-yellow-500 font-semibold">Title :{" "}</span>
                                {lectures && lectures[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-yellow-500 font-semibold line-clamp-3">Description :{" "}</span>
                                {lectures && lectures[currentVideo]?.description}
                            </p>
                        </div>
                        {/* Right side lecture list */}
                        <ul className=" flex flex-col justify-center items-center gap-4 p-4 shadow-[0_0_10px_black] rounded w-[28rem]">
                            <li className="flex justify-between items-center gap-10">
                                <h1>
                                    <span className="text-yellow-500 font-semibold text-2xl">Lecture list</span>
                                </h1>
                                {role === "ADMIN" &&
                                    <button
                                        //state?._id is means courseId
                                        onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                                        className="py-3 px-2 bg-blue-600 font-semibold rounded-md text-white hover:bg-blue-500 transition-all ease-in-out duration-300"
                                    >Add Lecture</button>
                                }
                            </li>
                            {
                                lectures && lectures.map((lecture, index) => {
                                    return (
                                        <li key={lecture._id} className="space-y-3">
                                            <p className="cursor-pointer " onClick={() => setCurrentVideo(index)} >
                                                <span>
                                                    Lecture : {index + 1} {"  "}
                                                </span>
                                                {lecture.title}
                                            </p>
                                            {role === "ADMIN" &&
                                                <button
                                                    onClick={() => handleDeleteLecture(state?._id, lecture?._id)}
                                                    className="py-3 px-2 bg-red-500 font-semibold rounded-md text-white hover:bg-red-600 transition-all ease-in-out duration-300"
                                                >Delete Lecture</button>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>)}
                </div>
            </HomeLayout>
        </>
    );


}
export default DisplayLectures;