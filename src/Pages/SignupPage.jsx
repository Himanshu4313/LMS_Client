import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmailValid, isPasswordValid } from "../Helpers/regExrMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slice/AuthSlice";

function SingUpPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    })

    // handle user input

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    //handle user Image
    function getImage(event) {
        event.preventDefault();

        //getting the image
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                console.log(this.result);
                setPreviewImage(this.result);
            })

        }


    }
    // hadle create new account 

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.avatar || !signupData.email || !signupData.fullName || !signupData.password) {
            toast.error('Please fill all the details');
            return;
        }
        // valideters for name
        if (signupData.fullName.length < 5) {
            toast.error('Name should be more than atleast 5 character');
            return;
        }
        //valideters for email
        if (!isEmailValid(signupData.email)) {
            toast.error('Please enter correct email');
            return;
        }
        //valideters for password
        if (!isPasswordValid(signupData.password)) {
            toast.error('Please choose strong password');
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);


        //dispatch create account action
        const response = await dispatch(createAccount(formData));
        if (response?.payload?.success)

            navigate("/");

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: "",
        })

        setPreviewImage("");

    }
    return (
        <>
            <HomeLayout>

                <div className="flex justify-center items-center min-h-[90vh]">

                    <div className=" py-4 px-10 shadow-[0px_0px_15px_rgba(0,0,0,0.3)]  text-white">
                        <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-start items-center gap-3">
                            <h1 className="text-white text-2xl font-bold">Registration Page</h1>
                            <label htmlFor="image_uploads"
                                className="cursor-pointer">
                                {previewImage ?
                                    (<img className="w-20 h-20 rounded-full m-auto" src={previewImage} />)
                                    :
                                    (
                                        <BsPersonCircle className="w-20 h-20  rounded-full m-auto" />
                                    )
                                }

                            </label>

                            <input
                                onChange={getImage}
                                type="file"
                                hidden
                                id="image_uploads"
                                name="userProfileImage"
                                accept=".jpg , .png , .jpeg , .svg"
                            />
                            <div>
                                <label htmlFor="fullName">Full Name</label>
                                <br />
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your name.."
                                    id="fullName"
                                    required
                                    className="py-1 pl-1 pr-14 rounded border "
                                    onChange={handleUserInput}
                                    value={signupData.fullName}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email.."
                                    id="email"
                                    required
                                    className="py-1 pl-1 pr-14 rounded border "
                                    onChange={handleUserInput}
                                    value={signupData.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password.."
                                    id="password"
                                    required
                                    className="py-1 pl-1 pr-14 rounded border "
                                    onChange={handleUserInput}
                                    value={signupData.password}
                                />
                            </div>
                            <div>
                                <button type="submit" className="bg-yellow-500 rounded 
                                cursor-pointer font-semibold py-1 px-14 hover:bg-yellow-600 transition-all ease-in-out">Create an account</button>
                            </div>
                            <p>Already have an account ? <Link to={"/login"} className="link text-green-500">Login</Link></p>
                        </form>
                    </div>
                </div>
            </HomeLayout>

        </>
    );
}
export default SingUpPage;