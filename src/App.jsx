import './App.css';

import { Route, Routes } from 'react-router-dom';

import AboutUsPage from './Pages/AboutUsPage';
import HomePage from './Pages/HomePage';

function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/aboutUS' element={<AboutUsPage/>}/>
       </Routes>
    </>
  )
}

export default App
