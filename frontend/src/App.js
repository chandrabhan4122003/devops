import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './component/autheticate/Login'
import Signup from './component/autheticate/Signup'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </Router>
  )
}

export default App
