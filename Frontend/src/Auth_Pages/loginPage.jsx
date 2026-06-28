import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";
import Logo from '../assets/Fitness_Beast_Logo.png'
import {
  Mail,
  Lock,
  Eye,
  Clock3,
  CalendarDays,
  ArrowRight,
  EyeOff
} from "lucide-react";

const AdminLoginPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPassword,setShowPassword] = useState(false)
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()

  const loginHandler = async () =>{
    try {
        const backendUrl= process.env.BACKEND_URL
        const responseFromBackend = await axios.post(
            `${backendUrl}/api/admin/auth/login`,
            loginData,
            {
             withCredentials:true
            }
        )

        console.log(loginData)

        if(responseFromBackend.data.success){
            toast.success("Login Successfull")
            navigate('/admin/dashboard')

        }else{
            toast.error(responseFromBackend.data.error)
        }

    } catch (error) {
        toast.error("Something went Wrong")
    }
    
  }

  //on change handler for the input values
  const onChangeInputHandler = (e) =>{
    const {name,value} = e.target
    setLoginData((prev)=>({
        ...prev,
        [name]:value
    }))
    console.log(loginData)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const day = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const date = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = currentTime.toLocaleTimeString("en-US");

  return (
    <div className="min-h-screen bg-[#07111f] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[180px] top-[-120px] right-[-120px]" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[150px] bottom-[-80px] left-[-80px]" />

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center relative z-10">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center">

          <img
            src={Logo}
            alt="Gym Logo"
            className="w-44 mb-8 drop-shadow-xl"
          />

          <h1 className="text-6xl font-extrabold text-white leading-tight">
            FITNESS
            <span className="block text-red-500">BEAST</span>
          </h1>

          <p className="text-gray-400 text-xl mt-4 max-w-md leading-9">
            Powerful Gym Management Platform for handling memberships,
            attendance, revenue and daily operations effortlessly.
          </p>

          <div className="mt-16 space-y-5">

            <div className="flex items-center gap-3 text-gray-300">

              <CalendarDays className="text-red-500" size={22} />

              <span>{day}</span>

              <span>•</span>

              <span>{date}</span>

            </div>

            <div className="flex items-center gap-3">

              <Clock3 className="text-red-500" size={22} />

              <span className="text-3xl font-semibold tracking-widest text-white">
                {time}
              </span>

            </div>

          </div>

        </div>

        {/* LOGIN CARD */}

        <div className="flex justify-center">

          <div className="w-full max-w-md rounded-3xl border border-gray-700/60 bg-[#111827]/90 backdrop-blur-xl p-10 shadow-2xl">

            <p className="text-red-500 font-semibold mb-2 tracking-widest uppercase">
              ADMIN PANEL
            </p>

            <h2 className="text-4xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-3 mb-10">
              Login to continue managing your gym.
            </p>

            {/* EMAIL */}

            <div className="mb-6">

              <label className="text-gray-300 text-sm mb-2 block">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-gray-700 bg-[#0b1320] px-4 h-14 focus-within:border-red-500 transition">

                <Mail className="text-gray-500 mr-3" size={20} />

                <input
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={onChangeInputHandler} 
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="text-gray-300 text-sm mb-2 block">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-700 bg-[#0b1320] px-4 h-14 focus-within:border-red-500 transition">

                <Lock className="text-gray-500 mr-3" size={20} />

                <input
                name="password"
                  type="password"
                  value={loginData.password}
                  onChange={onChangeInputHandler} 
                  placeholder="Enter password"
                  className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={()=>setShowPassword(prev=>!prev)}
                  className="text-gray-400 hover:text-white transition"
                >
                  {
                    showPassword
                      ? <EyeOff size={20} />
                      : <Eye size={20} />
                  }
                </button>

              </div>

            </div>

            {/* Forgot */}

            <div className="flex justify-end mt-4">

              <button className="text-red-500 text-sm hover:text-red-400 transition">
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}

            <button
              className="mt-8 h-14 w-full rounded-xl bg-red-600 hover:bg-red-500 transition-all duration-300 font-semibold text-white flex items-center justify-center gap-3 shadow-lg shadow-red-700/20"
            >
              Login
              <ArrowRight size={20} />
            </button>

            <div className="mt-10 border-t border-gray-700 pt-5">

              <p className="text-center text-gray-500 text-sm">
                Fitness Beast Gym Management System
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLoginPage;