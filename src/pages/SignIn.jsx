import { useState } from "react"
import logo from "../assests/x.png"
import { Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
})
//destructuring emanil and password from the form data
const { email, password} = formData
const navigate = useNavigate()

  const emailOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      email: e.target.value
    }))
} 

const passwordOnChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    password: e.target.value
  }))
}
  const submit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth();
     
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {

        toast.success("You are logged in")

        navigate('/')
      }

    } catch(error) {
          toast.error('Bad User Credentials')
    }

  }

  return (
    <div className="min-h-screen h-screen items-center justify-center py-12 mx-auto max-w-md  space-y-8">
            {/* Header */}
                <div className="mb-10">
                  <div className="flex justify-center">
                      <img src={logo} alt="" className="h-10 w-10" />
                  </div>

                  <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900"> 
                  Welcome Back!!!
                  </h2>

                  <p className="mt-2 text-center text-sm text-gray-600">
                    <Link to='/signup' className="font-medium text-gray-500">
                      Dont have an account yet? <span className="font-medium hover:text-black text-red-600">Sign up</span>
                    </Link>
                  </p>
                </div>

            {/* form */}
          
                <form action="" onSubmit={submit} className="mt-8 space-y-6">
                    <div className="-space-y-px">
                     
                      <input type="email" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Email"  value ={email} onChange={emailOnChange}/>
                    </div>


                    <div className="-space-y-px">
                     
                     <input type="password" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Password"  value ={password} onChange={passwordOnChange}/>
                   </div>

                    <input value="Sign In" onClick={submit} type="submit" className="group bg-red-600 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium cursor-pointer rounded-md text-white focus:outline-none mt-10" />
                </form>
            
               
    </div>
  )
}