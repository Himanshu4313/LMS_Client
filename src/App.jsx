import './App.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUsPage from './Pages/AboutUsPage';
import ContactUs from './Pages/ContactUs';
import CourseList from './Pages/Courses/CourseList';
import CreateCourse from './Pages/Courses/CreateCourse';
import Description from './Pages/Courses/DescriptionPage';
import Denied from './Pages/DeniedPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import SingUpPage from './Pages/SignupPage';

function App() {

  return (
    <>
      <Routes>
        {/* Route for pages */}
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutUS' element={<AboutUsPage />} />
        <Route path='/course' element={<CourseList />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/denied' element={<Denied />} />
        <Route path='/course/description/' element={<Description />} />

        {/* Route for authentication */}
        <Route path='/signup' element={<SingUpPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse />} />
        </Route>

        {/* Route for pageNotFound */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
