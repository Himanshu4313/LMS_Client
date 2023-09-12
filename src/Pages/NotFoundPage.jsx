import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className=" w-screen h-screen bg-slate-600 flex flex-col justify-center items-center">

                <div className="relative text-white">
                    <h1 className=" text-8xl font-extrabold tracking-widest " >404</h1>
                    <p className=" text-xs bg-red-800 rounded-md py-1 px-2 absolute top-[55px] left-[50px] rotate-12">
                        Page Not Found..
                    </p>
                </div>
                <div className="mt-10 ">
                    <button className=" py-2 px-3 border-2 font-semibold border-red-800 text-red-800 cursor-pointer" onClick={() => navigate(-1)}>
                        Go Home
                    </button>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage;