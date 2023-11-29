import { useDispatch } from "react-redux";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';



const OAuth = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[cookie,setCookie]=useCookies(["access_token"])


    const handleGoogleClick= async()=>{
       try {
          const provider=new GoogleAuthProvider();
          const auth=getAuth(app);
          const result=await signInWithPopup(auth,provider);
          console.log(result);
          const res=await fetch("http://localhost:3007/api/v1/google",
          {
             method:"POST",
             headers:{"Content-Type": "application/json"},
             body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
          })
          const data=await res.json();
            dispatch(signInSuccess(data))
            setCookie("access_token",data.token)
            navigate('/')
            // console.log(data);
          console.log(cookie);

       } catch (error) {
        console.log("Could not sign in with google",error.message);
       }
    }
  return (
    <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80">
      Continue with google
    </button>
  );
};

export default OAuth;
