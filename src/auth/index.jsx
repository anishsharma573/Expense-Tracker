
import { provider,auth } from "../config/firebaseConfig"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"

const  Auth =()=>{
let navigate =useNavigate();
  const signInWithGoogle = async()=>{
   const result =await signInWithPopup(auth,provider)
   const authinfo= {
userID:result.user.uid,
name:result.user.displayName,
profilePhoto:result.user.photoURL,
isAuth:true
   }
   localStorage.setItem("auth",JSON.stringify(authinfo))
   console.log("Result from sign-in:", result);  // Check what the result object contains
    console.log("User object:", result.user); 
   navigate("/expensetracker")
  }
  return (
    <div className="login-page">
    <p>Sign In with Google</p>
    <button className="login-with-google" onClick={signInWithGoogle}>Google</button>
    </div>
  )
}

export default Auth