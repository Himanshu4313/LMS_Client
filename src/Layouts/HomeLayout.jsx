import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/footer/Footer';

function HomeLayout({ children }) {

    const navigate = useNavigate();

    // for checking if user id loggedIn
    const isLoggedIn = useSelector((state) => state ?.auth ?.isLoggedIn);

    // for displaying the option acc to role 
    const role = useSelector((state) => state?.auth?.role); 
    
    function handleLogout(e){
         e.preventDefault();
        //  const res = await dispatch(logout());
        // if(res?.payload?.success)
        navigate("/");
    }

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }
    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0px';
       
    }
    return (
        <>
            <div className="min-h-[90vh]">
                <div className="drawer absolute left-0 z-50 w-fit">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="cursor-pointer relative">
                            <FiMenu
                                onClick={() => changeWidth()}
                                size={"32px"}
                                className="font-bold text-white m-4"
                            />
                        </label>
                    </div>
                    <div className="drawer-side w-0">
                        <label htmlFor="my-drawer" className='drawer-overlay'></label>
                        <ul className='menu p-4 w-40 sm:w-80 bg-base-200 text-base-content relative'>
                            <li className='w-fit absolute right-2 z-50'>
                                <button onClick={() => hideDrawer()}>

                                    <AiFillCloseCircle
                                        size={"24px"}
                                    />
                                </button>

                            </li>
                            <li>
                                <Link to={"/"}>Home</Link>
                            </li>
                              
                              { isLoggedIn && role === "ADMIN" && (
                                <li>
                                    <Link to={"/admin/dasboard"}>Admin DashBoard</Link>
                                </li>
                              )}

                            <li>
                                <Link to={"/course"}>Courses</Link>
                            </li>
                            <li>
                                <Link to={"/contactUs"}>Contact Us</Link>
                            </li>

                            <li>
                                <Link to={"/aboutUS"}>About Us</Link>
                            </li>

                            {!isLoggedIn && (
                                <li>
                                <div className='w-full flex justify-center item-center flex-col md:flex-row lg:flex-row'>
                            <button className=' btn-primary px-4 py-1 font-semibold rounded-md w-full '>
                                 <Link to={"/login"}>
                                    Login
                                 </Link>
                            </button>
                            <button className=' btn-secondary px-4 py-1 font-semibold rounded-md w-full '>
                                 <Link to={"/signup"}>
                                    SignUp
                                 </Link>
                            </button>
                                </div>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li>
                                <div className='w-full flex justify-center item-center '>
                            <button className=' btn-primary px-4 py-1 font-semibold rounded-md w-full '>
                                 <Link to={"/userprofile"}>
                                   Profile
                                 </Link>
                            </button>
                            <button className=' btn-secondary px-4 py-1 font-semibold rounded-md w-full '>
                                 <Link onClick={handleLogout}>
                                    Logout
                                 </Link>
                            </button>
                                </div>
                                </li>
                            )}
                           
                        </ul>
                    </div>
                </div>

                {children}

              <Footer/>
            </div>
        </>
    );
}
export default HomeLayout;