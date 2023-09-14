import { Navigate } from "react-router-dom";

function Denied() {

    return (
        <>
            <main className="w-full h-screen flex flex-col justify-center items-center bg-[#03203C]">

                <h1 className="text-white text-9xl font-extrabold tracking-widest">
                    403
                </h1>
                <span className="py-1 px-5 text-xs bg-black text-white absolute top-[40%] rotate-12">Denied Page</span>
                <h1 className="text-white text-4xl font-bold tracking-wide my-4">We are Sorry...</h1>
                <p className="mt-3 mb-8 line-camp-3 w-4/12 text-center">

                    This page your are trying to access has restricted access. Please refer to your system administrator.

                </p>
                <button onClick={() => Navigate(-1)}>
                    <span className="py-4 px-6 border border-current font-semibold rounded hover:bg-yellow-500 hover:text-white transition-all ease-in-out duration-300">Go back</span>
                </button>
            </main>

        </>
    );

}
export default Denied;