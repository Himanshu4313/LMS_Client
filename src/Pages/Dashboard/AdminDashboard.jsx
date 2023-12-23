import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slice/courseSlice";
import { getStatsData } from "../../Redux/Slice/StatsSlice";
import { getPaymentRecord } from "../../Redux/Slice/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { GiMoneyStack } from 'react-icons/gi';
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
ChartJs.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allUserCount, subscribeCount } = useSelector((state) => state?.stats);
    const { allPayments, finalMonths, monthlySalesRecord } = useSelector((state) => state?.razorpay);

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                data : [allUserCount , subscribeCount],
                // data: [80, 30],
                backgroundColor: ["yellow", "green"],
                borderWidth: 2,
                borderColor: ["yellow", "green"],
            }
        ],
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Monthly / Sales",
                data: monthlySalesRecord,
                backgroundColor: ["red"],
                borderColor: "white",
                borderWidth: 2
            }
        ]
    }
 async function loadCourses(){
    await dispatch(getAllCourses());
 }
 useEffect(() =>{
    loadCourses();
 },[])   
        
      
      

    const myCourses = useSelector((state) => state?.courses?.courseData);
    console.log('Admin dashboard course list',myCourses)
    async function handleDeleteCourse(id) {
        if (window.confirm("Are you sure you want to delete this course ?")) {
            const res = await dispatch(deleteCourse(id));

            if (res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }
    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourses());
                await dispatch(getStatsData());
                await (getPaymentRecord());
            }
        )
    }, [])
    return (
        <>
            <HomeLayout>
                <div className="min-h-[90vh] flex flex-col flex-wrap gap-10 py-5 mx-5">
                    <h1 className=" text-2xl font-semibold text-yellow-500 text-center">Admin Dashboard</h1>
                    <div className=" grid grid-cols-2 gap-5 m-auto mx-10">

                        <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">

                            <div className="w-80 h-80">
                                <Pie data={userData} />
                            </div>

                            <div className=" grid grid-cols-2 gap-5">
                                <div className="flex justify-between items-center p-5 gap-5 rounded-md shadow-md ">
                                    <div className="flex flex-col justify-center items-center gap-5 text-white">
                                        <p className="text-xl font-semibold">Registered Users</p>
                                        <h3 className="text-3xl font-bold">{allUserCount}</h3>
                                    </div>
                                    <FaUsers className="text-5xl font-bold text-yellow-500" />
                                </div>
                                <div className="flex justify-between items-center p-5 gap-5 rounded-md shadow-md ">
                                    <div className="flex flex-col justify-center items-center gap-5 text-white">
                                        <p className="text-xl font-semibold">Subscribe Users</p>
                                        <h3 className="text-3xl font-bold">{subscribeCount}</h3>
                                    </div>
                                    <FaUsers className="text-5xl font-bold text-green-500" />
                                </div>
                            </div>

                        </div>

                        <div className=" flex flex-col items-center  gap-10 p-5 shadow-lg rounded-md">
                            <div className="w-full h-80 relative">
                                <Bar className="absolute bottom-0 h-80" data={salesData} />
                            </div>
                            <div className=" grid grid-cols-2 gap-5 ">
                                <div className="flex justify-between items-center p-5 gap-5 rounded-md shadow-md ">
                                    <div className="flex flex-col justify-center items-center gap-5 text-white">
                                        <p className="text-xl font-semibold">Subscription Count</p>
                                        {/* <h3 className="text-3xl font-bold">{allPayments?.count}</h3> */}
                                        <h3 className="text-3xl font-bold">{75}</h3>
                                    </div>
                                    <FcSalesPerformance className="text-5xl font-bold text-yellow-500" />
                                </div>
                                <div className="flex justify-between items-center p-5 gap-5 rounded-md shadow-md ">
                                    <div className="flex flex-col justify-center items-center gap-5 text-white">
                                        <p className="text-xl font-semibold">Total Revenu</p>
                                        {/* <h3 className="text-3xl font-bold">{allPayments?.count * 499}</h3> */}
                                        <h3 className="text-3xl font-bold">{(75 * 499)}</h3>
                                    </div>
                                    <GiMoneyStack className="text-5xl font-bold text-green-500" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-center text-3xl font-semibold">
                                Courses overview
                            </h1>

                            <button
                                onClick={() => {
                                    navigate("/course/create")
                                }}
                                className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                            >
                                Create new course
                            </button>
                        </div>

                        <table className="table overflow-x-scroll">
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Course Title</th>
                                    <th>Course Category</th>
                                    <th>Instructor</th>
                                    <th>Total Lectures</th>
                                    <th>Description</th>
                                    <th>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {myCourses?.map((course, idx) => {
                                    return (
                                        <tr key={course._id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                            </td>
                                            <td>
                                                {course?.category}
                                            </td>
                                            <td>
                                                {course?.createdBy}
                                            </td>
                                            <td>
                                                {course?.numberOfLectures}
                                            </td>
                                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                                <textarea
                                                    value={course?.description}
                                                    readOnly
                                                    className="w-80 h-auto bg-transparent resize-none"
                                                >

                                                </textarea>
                                            </td>
                                            <td className="flex items-center gap-4">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                    onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                                                >
                                                    <BsCollectionPlayFill />
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                    onClick={() => handleDeleteCourse(course?._id)}
                                                >
                                                    <BsTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
export default AdminDashboard;
// WHEN YOU CREATE A BACKEND PART OF THIS LMS , IN THAT TIME YOU IMPLETE DELETE COURSE LOGIC /

// THIS WILL BE MISSING IN THAT TIME WHEN YOU CREATE BACKEND
