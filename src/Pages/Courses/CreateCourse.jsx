import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slice/courseSlice";

function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        previewImage: "",
        thumbnail: null,
    });

    function handleUploadImage(e) {
        e.preventDefault();

        const uploadImage = e.target.files[0];
        if(uploadImage){

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadImage,
                })
            })
        }
    }

    function handleUserInput(e) {
        e.preventDefault();

        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        if (!userInput.title || !userInput.category || !userInput.createdBy || !userInput.description || !userInput.thumbnail) {
            toast.error("All fileds are mandatroy..");
            return;
        }

        //   Call createCourseSlice for creating new course
        const response = await dispatch(createNewCourse(userInput));

        if (response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                previewImage: "",
                thumbnail: null,
            })

            navigate("/course");
        }

    }

    return (

        <HomeLayout>
            <div className="w-full min-h-[100vh] flex justify-center items-center py-15 px-10">
                <form
                    noValidate
                    onSubmit={handleOnSubmit}
                    className="w-[700px] flex flex-col justify-center shadow-[0_0_10px_black] gap-3 rounded text-white py-2 px-5 relative"
                >
                    <h1 className="text-2xl font-bold py-2 text-center">Create new Course</h1>
                    <main className=" grid grid-cols-2 gap-x-10">
                        <div className="gap-y-4">
                            <div>

                                <label htmlFor="uploads_Image" className="cursor-pointer ">
                                    {
                                        (userInput.previewImage) ? (
                                            <img
                                                src={userInput.previewImage}
                                                alt="Uploads_Image"
                                                className="w-full h-44 m-auto border rounded-sm"
                                            />
                                        ) : (
                                            <div className="w-full h-44 m-auto border rounded-sm flex justify-center items-center">

                                                <h1 className="font-bold text-lg ">Upload Your Thumbnail</h1>
                                            </div>
                                        )

                                    }

                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    name="previewImage"
                                    id="uploads_Image"
                                    accept=".jpg , .jpeg , .png"
                                    onChange={handleUploadImage}
                                    
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-1 my-2">
                                   <label htmlFor="title" className="text-lg font-semibold">Course title</label>
                                   <input 
                                   type="text"
                                   id="title"
                                   name="title"
                                   className="text-sm font-semibold py-2 px-1 border bg-transparent rounded-sm"
                                   placeholder="Enter your course title..."
                                   onChange={handleUserInput}
                                   value={userInput.title}
                                   />
                            </div>
                        </div>
                        <div className="gap-y-4">
                           <div className="flex flex-col justify-center gap-1 my-2">
                                   <label htmlFor="category" className="text-lg font-semibold">Course category</label>
                                   <input 
                                   type="text"
                                   id="category"
                                   name="category"
                                   className="text-sm font-semibold py-2 px-1 border bg-transparent rounded-sm"
                                   placeholder="Enter your course category..."
                                   onChange={handleUserInput}
                                   value={userInput.category}
                                   />
                            </div>    
                            <div className="flex flex-col justify-center gap-1 my-2">
                                   <label htmlFor="Instructor" className="text-lg font-semibold">Instructor</label>
                                   <input 
                                   type="text"
                                   id="Instructor"
                                   name="createdBy"
                                   className="text-sm font-semibold py-2 px-1 border bg-transparent rounded-sm"
                                   placeholder="Enter your course Instructor..."
                                   onChange={handleUserInput}
                                   value={userInput.createdBy}
                                   />
                            </div> 
                            <div className="flex flex-col justify-center gap-1 my-2">
                                   <label htmlFor="Description" className="text-lg font-semibold">Course Description</label>
                                   <textarea
                                   id="Description"
                                   name="description"
                                   className="text-sm font-semibold py-2 px-1 border bg-transparent rounded-sm resize-none h-44 "
                                   placeholder="Enter your course Description..."
                                   onChange={handleUserInput}
                                   value={userInput.description}
                                   />
                            </div> 
                        </div>

                    </main>
                    <button 
                    type="submit"
                    onChange={handleOnSubmit}
                    className="flex justify-center items-center bg-yellow-600 rounded-md cursor-pointer py-2 px-1 hover:bg-yellow-500 transition-all ease-in-out duration-400">
                        Create new Course
                    </button>
                </form>
            </div>
        </HomeLayout>

    );
}
export default CreateCourse;