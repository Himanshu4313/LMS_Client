import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slice/courseSlice";

function CourseList(){
        /**
         * This dispatch part is working when we make a bakend of courseList 
         */
   //  const dispatch =  useDispatch();
  //  const {courseData} = useSelector((state) => state?.courseData);

   //  async function loadCourses (){
   //       await dispatch(getAllCourses());
   //  }
   //  useEffect(() => {
   //       loadCourses();
   //  },[]);

         return(
            <>
                    <HomeLayout>
                         
                       <div className="min-h-[90vh] flex flex-col gap-10 text-white pt-20 pl-15">
                                  <h1 className="text-center text-3xl font-bold">
                                    Explore the courses made by 
                                    <span className="text-yellow-500 font-bold ml-2">
                                        Industry Experts
                                    </span>
                                  </h1>
                                  <div className=" flex flex-warp mb-10 gap-14">
                                    {/* {courseData?.map((element) => {
                                       return <CourseCard key={element._id} data={element}/>
                                    })} */}
                                  </div>
                       </div>
                        
                    </HomeLayout>
            </>
         );
}
export default CourseList;