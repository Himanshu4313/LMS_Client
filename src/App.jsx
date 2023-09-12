import './App.css';

import { Route, Routes } from 'react-router-dom';

import AboutUsPage from './Pages/AboutUsPage';
import HomePage from './Pages/HomePage';
import NotFoundPage from './Pages/NotFoundPage';

function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/aboutUS' element={<AboutUsPage/>}/>

        <Route path='*' element={<NotFoundPage/>}/>
       </Routes>
    </>
  )
}

export default App
