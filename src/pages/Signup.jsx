import logo from "../assests/x.png"
import { useState } from "react"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from "../firebase"
import { Link, useNavigate} from "react-router-dom";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import {toast} from "react-toastify"



export default function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    profession: '',
    email: '',
    password:'',
  
})

  const { email, password, profession, username, fullname} = formData
  
  const onFullNameChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      fullname: e.target.value
    }))
  }

  const onUserNameChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      username: e.target.value
    }))
  }

  const onProfessionChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profession: e.target.value
    }))
  }

  const onEmailChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      email: e.target.value
    }))
  }

  const onPasswordChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      password: e.target.value
    }))
  }


  const submit = async(e) => {
      e.preventDefault();

      try{
          const auth = getAuth();
          const res = await createUserWithEmailAndPassword(auth, email, password);

          const formDataCopy = {...formData};
          const uName = formDataCopy.username
          const uNameLower = uName.toLowerCase()
          const em = formDataCopy.email
          const emLower = em.toLowerCase()
          delete formDataCopy.password
          formDataCopy.username= uNameLower
          formDataCopy.email = emLower
          formDataCopy.uid = res.user.uid
          formDataCopy.timestamp = serverTimestamp();

          await updateProfile(res.user, {
            displayName:username,            
          })

          await setDoc(doc(db, 'users', res.user.uid), formDataCopy);
          
          await setDoc(doc(db, 'userChats', res.user.uid), {
          })
          toast.success('Successful')

          // navigate to home page
          navigate('/signin')
      } catch (error){
          console.log(error)
          toast.error('Not Successful')
      }
  }

  return (
    <div className="min-h-screen h-screen items-center justify-center py-12  mx-auto max-w-md  space-y-8">
            {/* Header */}
                <div className="mb-10">
                  <div className="flex justify-center">
                      <img src={logo} alt="" className="h-10 w-10" />
                  </div>

                  <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900"> 
                  Sign up to create an accoount
                  </h2>

                  <p className="mt-2 text-center text-sm text-gray-600">
                    <Link to='/signin' className="font-medium text-gray-500">
                    Already have an account? <span className="font-medium hover:text-black text-red-600">Login</span>
                    </Link>
                  </p>
                </div>

            {/* form */}
          
                <form action="" onSubmit={submit} className="mt-8 space-y-6">
                    <div className="-space-y-px">
                     
                      <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="FullName"  value ={fullname} onChange={onFullNameChange }/>

                    </div>

                    <div className="-space-y-px">
                     
                     <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Username"  value ={username} onChange={onUserNameChange}/>

                   </div>

                    

                    <div className="-space-y-px">
                     
                      <input type="email" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Email"  value ={email} onChange={onEmailChange}/>

                    </div>


                    <div className="-space-y-px">
                     
                      <input type="password" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Password"  value ={password} onChange={onPasswordChange}/>

                    </div>

                    <div className="-space-y-px">
                     
                     <input type="text" className="sr-only rounded-md appearance-none relative block w-full h-8  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-200 focus:ring-0  sm:text-sm" required placeholder="Profession"  value ={profession} onChange={onProfessionChange}/>

                   </div>

                    <input value="Sign Up" onClick={submit} type="submit" className=" group bg-red-600 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm cursor-pointer font-medium rounded-md text-white focus:outline-none mt-10" />
                </form>
            
               
    </div>
  )
}
