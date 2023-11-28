import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useDispatch,useSelector } from "react-redux";
import { signInFailure,signInSuccess,signInStart } from "../features/userSlice";
import OAuth from "../components/OAuth";



const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [cookie,setCookie]=useCookies(["access_token"]);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {error,loading}=useSelector((state)=>state.user)


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      const res = await fetch("http://localhost:3007/api/v1/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success==false) {
         dispatch(signInFailure(data.message))
        return;
      }

       dispatch(signInSuccess(data));
      navigate("/");
      setCookie('access_token',data.token)
      console.log(cookie);
    } catch (error) {
        dispatch(signInFailure(error.message))
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

    return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            onChange={handleChange}
            type="email"
            placeholder="email"
            id="email"
            className="border p-3 rounded-lg focus:outline-none"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="password"
            id="password"
            className="border p-3 rounded-lg focus:outline-none"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth/>
        </form>
  
        <div className="flex gap-2 mt-5">
          <p>Do not have  any account?</p>
          <Link to="/sign-up">
            <span className="text-blue-700">Sing Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    );
  
}

export default SignIn