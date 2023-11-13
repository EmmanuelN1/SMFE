
import './App.css';
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import SignIn from "./pages/SignIn"
import SignUp from "./pages/Signup"
import { AuthContext } from './contextApi/AuthContext';
import Home from "./pages/Home"
import Chats from "./pages/Chats"

function App() {
  const {currentUser}  = useContext(AuthContext) 

  // Creating a protected route
  
  const ProtectedRoute = ({children}) => {
      if (!currentUser) {
        return <Navigate to="/signin"/>
      }

      return children
  }

  return (
        <>
          <BrowserRouter>
           
              <Routes>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/chats" element={
                    <ProtectedRoute>
                      <Chats/>
                    </ProtectedRoute>
                }/>
              </Routes>
          </BrowserRouter>
          <ToastContainer/>
        </>
  )
}

export default App;
