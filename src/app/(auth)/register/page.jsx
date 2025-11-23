
'use client'
import React, { useState } from "react";


import {useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {auth} from '@/app/firebase/config'
import { useRouter } from "next/navigation";

const Registerpage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
  const router = useRouter()

  const handleSignUp = async  (e)=>{
    e.preventDefault()
    try{
      const res = await createUserWithEmailAndPassword(email, password)
      console.log({res})
      if (res?.user) {
      setEmail("");
      setPassword("");
      router.push("/");
    }
    }catch(e){console.error(e)}
  }
  return <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Register
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4" >
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          {/* photo */}
          <div>
            <label className="block mb-1 font-medium">Photo</label>
            <input
              type="text"
              placeholder="Photo"
              className="w-full px-4 py-2 border rounded-lg "
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
               value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg "
              required
            />
          </div>

          

          {/* Register Button */}
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-semibold">
            Login Now
          </a>
        </p>
      </div>
    </div>;
};

export default Registerpage;
