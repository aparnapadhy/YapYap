import React, { useState } from "react";
import assets from "../assets/assets.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();
  
  const onSubmitHandler= async (event) => {
    event.preventDefault();

    if(currState==="Sign Up" && !isDataSubmitted){
      setIsDataSubmitted(true);
      return;
    }

     await login(currState=== "Sign Up"? 'signup': 'login',{fullName,email,password,bio});
    navigate('/'); 

  }

  return (
    <div className="h-screen sm:h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

      {/*-------left-----------*/}
      <div className="flex flex-col  h-[50vh] justify-center items-center sm:ml-[3vw] sm:my-[30vh]  mt-[270px] ">
      <img src={assets.logo_icon} alt="" className="w-[70px] sm:w-[10vw]"/>
      <div className="flex">
          <p className="text-pink-300  text-[50px] sm:text-[6vw] sm:-mt-[3vh]">Yap</p>
         <p className="text-pink-500  text-[50px] sm:text-[6vw] sm:-mt-[3vh]">Yap</p>
      </div>
      </div>
   
      {/*-------right-----------*/}
      <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 text-white border-pink-600 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[90vw] mb-[40vh]  sm:w-[400px] sm:my-[10vh]">

        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && 
          <img onClick={()=> {setIsDataSubmitted(false)}} src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" />}
        </h2>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" className="p-2 border border-pink-400 focus:ring-2 focus:ring-pink-400 rounded-md focus:outline-none focus:border-0" placeholder="Full Name" required/>
        )}

        {!isDataSubmitted && (
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Email Address" required className="p-2 border border-pink-400 rounded-md focus:outline-none  focus:ring-2 focus:ring-pink-400 focus:border-0"/>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="p-2 border border-pink-400 rounded-md focus:outline-none  focus:ring-2 focus:ring-pink-400 focus:border-0"/>
          </>
        )}

        {
          currState === "Sign Up" && isDataSubmitted && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className="p-2 border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Provide a short bio.." required></textarea>
          )
        }

        <button type="submit" className="py-3 bg-gradient-to-r from-pink-500 to-[#FF8C42] text-white rounded-md cursor-pointer">
          {currState === "Sign Up" ? "Create an account" : "Login now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500 ">
          <input type="checkbox" required/>
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign Up"? (
            <p className="text-sm text-gray-600">Already have an account? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className="font-medium text-pink-500 cursor-pointer">Login here</span></p>
          ): (
            <p className="text-sm text-gray-600">Create an account <span onClick={()=>{setCurrState("Sign Up")}} className="font-medium text-pink-500 cursor-pointer">Click here</span></p>
          )}
        </div>

      </form>

    </div>
  );
};

export default LoginPage;
