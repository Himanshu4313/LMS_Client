import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {  BsArrowLeft, BsPersonCircle } from "react-icons/bs";
import { editProfileData , getUserData} from "../../Redux/Slice/AuthSlice.js";

function EditProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        fullName: "",
        previewImage: "",
        avatar: undefined,
        user_Id: useSelector((state) => state?.auth?.data?._id)
    });

    function handleImage(e) {
        e.preventDefault();

        const uploadImage = e.target.files[0];

        if (uploadImage) {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadImage,
                })
            });
        }

    }

    function handleUserInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        })

    }

    async function onSubmit(e) {
        e.preventDefault();

        if (!data.fullName && !data.avatar) {
            toast.error("All fields are mandatroy");
            return;
        }
        if (data.fullName < 5) {
            toast.error("Name should be atleast more then 5 character");
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
         
         await dispatch(editProfileData(formData));
       
        const response = await dispatch(getUserData());
        // console.log(response);
        // if (response?.payload?.success) {
        //     navigate("/");
        // }


    }

    return (
        <>
            <HomeLayout>
                <div className="min-h-[100vh] flex justify-center items-center  ">
                    <form 
                    noValidate
                    onSubmit={onSubmit}
                    className="flex flex-col justify-center items-center gap-3 p-3 rounded-md shadow-[0_0_10px_black] py-4 px-10 text-white">
                            <h1 className="text-xl font-semibold tracking-widest">Edit profile</h1>
                            <label htmlFor="image_uploads"
                                className="cursor-pointer">
                                {data.previewImage ?
                                    (<img className="w-20 h-20 rounded-full m-auto" src={data.previewImage} />)
                                    :
                                    (
                                        <BsPersonCircle className="w-20 h-20  rounded-full m-auto" />
                                    )
                                }
                               
                               <input 
                               className="hidden"
                               type="file"
                               id="image_uploads"
                               name="avatar"
                               accept=".png , .jpeg , .jpg , .svg"
                               onChange={handleImage}

                               />
                            </label>
                            <div className="flex flex-col justify-center  gap-2">
                               <label htmlFor="full Name" className="font-semibold">Full Name</label>
                               <input 
                               required
                               type="text"
                               id="fullName"
                               name="fullName"
                               className="py-1 px-2 rounded-sm border w-fit trasparent"
                               placeholder="Enter your full name..."
                               onChange={handleUserInput}
                               value={data.fullName}
                               />
                            </div>

                            <button type="submit" className=" w-full py-2 text-center font-semibold rounded cursor-pointer bg-yellow-600 hover:bg-yellow-500 ">
                                   Update Profile
                            </button>

                            <Link  to={"/"} className="link text-green-700 flex justify-center items-center gap-2">
                                <BsArrowLeft/>Go back to home
                            </Link>

                    </form>
                </div>
            </HomeLayout>
        </>
    );

}
export default EditProfile;