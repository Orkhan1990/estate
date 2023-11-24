import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [formData,setFormData]=useState({});


    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch("http://localhost:3007/api/v1/signUp",
        {
            method:"POST",
            headers:{
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify(formData)
        });

        const data=await res.json();
       console.log(data)
    }

    const handleChange=(e)=>{
         setFormData({...formData,[e.target.id]:e.target.value})
    }
    console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input onChange={handleChange} type="text"  placeholder="username" id="username" className="border p-3 rounded-lg focus:outline-none"/>
          <input onChange={handleChange} type="email" placeholder="email" id="email"  className="border p-3 rounded-lg focus:outline-none"/>
          <input onChange={handleChange} type="password" placeholder="password" id="password" className="border p-3 rounded-lg focus:outline-none"/>
         <button className="bg-slate-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
        <button className="bg-red-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80">Continue with google</button>
        </form>

        <div className="flex gap-2 mt-5">
           <p>Have an account?</p>
           <Link to="/sign-in">
           <span className="text-blue-700">Sing In</span>
           </Link>
        </div>

    </div>
  )
}

export default SignUp