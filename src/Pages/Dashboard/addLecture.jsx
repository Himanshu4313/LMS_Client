import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slice/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {

    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        //UNCOMMENT WHEN CREATE BACKEND
        // id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        video_url: "",
        video_src: "",

    });

    function onhandleUserInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }

    function handleVideoUrl(e) {
        e.preventDefault();
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log(source);
        setUserInput({
            ...userInput,
            video_url: video,
            video_src: source,
        })
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.lecture || !userInput.description) {
            toast.error("All fields are mandatroy");
            return;
        }
        const response = await dispatch(addCourseLecture(userInput));
        if (response?.payload?.success) {
            setUserInput({
                //UNCOMMENT WHEN CREATE BACKEND
                // id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                video_url: "",
                video_src: "",

            });

        }
    }
    //UNCOMMENT WHEN CREATE BACKEND
    // useEffect(() => {
    //     if (!courseDetails) navigate("/course");
    // }, [])

    return (
        <>
            <HomeLayout>
                <div className="min-h-[90vh] flex justify-center items-center flex-col gap-10 text-white py-10 mx-5">
                    <div className="flex flex-col gap-4 justify-center p-4 shadow-[0_0_10px_black] rounded w-96">
                        <header className="flex justify-center items-center relative">
                            <button
                                onClick={() => navigate(-1)}
                                className="absolute left-2 text-2xl font-semibold text-green-500 hover:scale-105 transition-all ease-in-out duration-200">
                                <AiOutlineArrowLeft />
                            </button>
                            <h1 className=" text-yellow-500 font-semibold text-lg">
                                Add New Lecture
                            </h1>
                        </header>
                        <form 
                        noValidate
                        onSubmit={onSubmit}
                        className="flex flex-col gap-3">
                           
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="enter title of the lecture"
                                    className="py-2 px-1 bg-transparent border rounded "
                                    onChange={onhandleUserInput}
                                    value={userInput.title}
                                />
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="enter description of the lecture"
                                    className="py-2 px-1 bg-transparent border rounded h-28 resize-none"
                                    onChange={onhandleUserInput}
                                    value={userInput.description}
                                />

                               {userInput.video_src ? (
                                        <video
                                          src={userInput.video_src}
                                          muted
                                          controls
                                          disablePictureInPicture
                                          className="object-fill rounded-tl-lg rounded-tr-lg w-fill"
                                        >

                                        </video>
                               ) : (
                                    <div className="flex justify-center items-center border bg-transparent h-[25vh]">
                                        <label htmlFor="lecture" className="text-xl font-semibold cursor-pointer">Choose your video</label>

                                        <input 
                                        type="file"
                                        id="lecture"
                                        name="lecture"
                                        onChange={handleVideoUrl}
                                        accept="video/mp4 video/x-mp4 video/*"
                                        className="hidden"
                                        />

                                    </div>
                               )}

                            <button type="submit" className="btn-primary py-2 px-4 text-lg font-semibold">Add new lecture</button>
                        </form>
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
export default AddLecture;