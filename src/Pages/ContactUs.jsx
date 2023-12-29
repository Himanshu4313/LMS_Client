import { useState } from 'react';
import toast from 'react-hot-toast';

import contactImage from '../assets/contactImage.svg';
import axiosInstance from '../Helpers/axiosInstances';
import { isEmailValid, isPasswordValid } from '../Helpers/regExrMatcher';
import HomeLayout from "../Layouts/HomeLayout";
function ContactUs() {

    const [userInput, setUserinput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleUserInput(event) {
        event.preventDefault();

        const { name, value } = event.target;
        // console.log(name , value);
        setUserinput({
            ...userInput,
            [name]: value,
        })
    }
   
   async  function onFormSubmit(event){
          event.preventDefault();
          
          if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All fileds are mandatroy");
          }
          if(!isEmailValid(userInput.email)){
            toast.error("Invaild Email");
          }

          try {
            const response = axiosInstance.post("/contact" , userInput);
            toast.promise(response , {
                loading : "Submitting your message..",
                success : "Form submitted successfully",
                error : "Failed to submit the form"

            });
           const contactResponse =  await response;
          if(contactResponse?.data?.success){
                setUserinput({
                    name: "",
                    email: "",
                    message: "",
                })
          }
          } catch (error) {
            toast.error("Operation Failed");
          }
   }
    return (
        <>
            <HomeLayout>
                <div className="min-h-[100vh] flex justify-center items-center lg:gap-40 ">
                    <div className=' hidden md:hidden lg:block '>
                        <img src={contactImage} alt="contactImage " />
                    </div>


                    <form
                       noValidate
                       onSubmit={onFormSubmit}
                        className="flex flex-col justify-center items-center gap-2 text-white rounded-md shadow-[0_0_10px_black] w-[22rem] p-5 "
                    >
                        <h1 className="text-3xl font-semibold">Contact Form</h1>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor="name" className='font-semibold text-xl'>Name</label>
                            <input
                                type="text"
                                placeholder='Enter your name..'
                                name='name'
                                id='name'
                                className='bg-transparent border px-2 py-1 rounded-sm'
                                onChange={handleUserInput}
                                value={userInput.name}
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor="email" className='font-semibold text-xl'>Email</label>
                            <input
                                type="email"
                                placeholder='Enter your email..'
                                name='email'
                                id='email'
                                className='bg-transparent border px-2 py-1 rounded-sm'
                                onChange={handleUserInput}
                                value={userInput.email}
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor="message" className='font-semibold text-xl'>Message</label>
                            <textarea
                                placeholder='Enter your message..'
                                name='message'
                                id='message'
                                className='bg-transparent border px-2 py-1 rounded-sm resize-none h-40'
                                onChange={handleUserInput}
                                value={userInput.message}
                            />
                        </div>
                        <div className='flex jsutify-center items-center gap-2 w-full'>

                            <button type='submit'
                                className='bg-yellow-500 px-3 py-2 text-white rounded-sm cursor-pointer font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-200 w-full'
                            >Submit</button>
                        </div>
                    </form>
                </div>

            </HomeLayout>

        </>
    )
}

export default ContactUs;