import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
        <form className="flex flex-col gap-4 ">
          <input type="text"  placeholder="username" id="username" className="border p-3 rounded-large focus:outline-none"/>
          <input type="email" placeholder="email" id="email"  className="border p-3 rounded-large focus:outline-none"/>
          <input type="password" placeholder="password" id="password" className="border p-3 rounded-large focus:outline-none"/>
         <button className="bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
        <button className="bg-red-700 text-white uppercase hover:opacity-95 disabled:opacity-80">Continue with google</button>
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