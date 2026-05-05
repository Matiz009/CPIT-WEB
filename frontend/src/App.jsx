import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router";
import Navbar from './Navbar';
import Home from './Home';
import  { StateComponent }  from './StateComponent';
import About from './About';
const App = () => {
  const PI = 3.14;

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/state' element={<StateComponent/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}


export default App