// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import toast from "react-hot-toast";
// import Logo from '../assets/Fitness_Beast_Logo.png'
// import {
//   Mail,
//   Lock,
//   Eye,
//   Clock3,
//   CalendarDays,
//   ArrowRight,
//   EyeOff
// } from "lucide-react";

// const AdminLoginPage = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [showPassword,setShowPassword] = useState(false)
//   const [loginData,setLoginData] = useState({
//     email:"",
//     password:""
//   })
//   const navigate = useNavigate()

//   const loginHandler = async () =>{
//     try {
//         const backendUrl= import.meta.env.VITE_BACKEND_URL;
//         console.log(backendUrl)
//         const responseFromBackend = await axios.post(
//             `${backendUrl}/api/admin/auth/login`,
//             loginData,
//             {
//              withCredentials:true
//             }
//         )

//         console.log(loginData)

//         if(responseFromBackend.data.success){
//             toast.success("Login Successfull")
//             navigate('/admin/dashboard')

//         }else{
//             toast.error(responseFromBackend.data.error)
//         }

//     } catch (error) {
//         console.log(error);

//     console.log(error.response);

//     console.log(error.response?.data);

//     toast.error(
//         error.response?.data?.message || "Something went Wrong"
//     );
//     }
    
//   }

//   //on change handler for the input values
//   const onChangeInputHandler = (e) =>{
//     const {name,value} = e.target
//     setLoginData((prev)=>({
//         ...prev,
//         [name]:value
//     }))
//     console.log(loginData)
//   }

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const day = currentTime.toLocaleDateString("en-US", {
//     weekday: "long",
//   });

//   const date = currentTime.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   const time = currentTime.toLocaleTimeString("en-US");

//   return (
//     <div className="min-h-screen bg-[#07111f] flex items-center justify-center px-6 relative overflow-hidden">

//       {/* Background Glow */}
//       <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[180px] top-[-120px] right-[-120px]" />
//       <div className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[150px] bottom-[-80px] left-[-80px]" />

//       <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center relative z-10">

//         {/* LEFT SIDE */}

//         <div className="hidden lg:flex flex-col justify-center">

//           <img
//             src={Logo}
//             alt="Gym Logo"
//             className="w-44 mb-8 drop-shadow-xl"
//           />

//           <h1 className="text-6xl font-extrabold text-white leading-tight">
//             FITNESS
//             <span className="block text-red-500">BEAST</span>
//           </h1>

//           <p className="text-gray-400 text-xl mt-4 max-w-md leading-9">
//             Powerful Gym Management Platform for handling memberships,
//             attendance, revenue and daily operations effortlessly.
//           </p>

//           <div className="mt-16 space-y-5">

//             <div className="flex items-center gap-3 text-gray-300">

//               <CalendarDays className="text-red-500" size={22} />

//               <span>{day}</span>

//               <span>•</span>

//               <span>{date}</span>

//             </div>

//             <div className="flex items-center gap-3">

//               <Clock3 className="text-red-500" size={22} />

//               <span className="text-3xl font-semibold tracking-widest text-white">
//                 {time}
//               </span>

//             </div>

//           </div>

//         </div>

//         {/* LOGIN CARD */}

//         <div className="flex justify-center">

//           <div className="w-full max-w-md rounded-3xl border border-gray-700/60 bg-[#111827]/90 backdrop-blur-xl p-10 shadow-2xl">

//             <p className="text-red-500 font-semibold mb-2 tracking-widest uppercase">
//               ADMIN PANEL
//             </p>

//             <h2 className="text-4xl font-bold text-white">
//               Welcome Back
//             </h2>

//             <p className="text-gray-400 mt-3 mb-10">
//               Login to continue managing your gym.
//             </p>

//             {/* EMAIL */}

//             <div className="mb-6">

//               <label className="text-gray-300 text-sm mb-2 block">
//                 Email Address
//               </label>

//               <div className="flex items-center rounded-xl border border-gray-700 bg-[#0b1320] px-4 h-14 focus-within:border-red-500 transition">

//                 <Mail className="text-gray-500 mr-3" size={20} />

//                 <input
//                   name="email"
//                   type="email"
//                   value={loginData.email}
//                   onChange={onChangeInputHandler} 
//                   placeholder="Enter your email"
//                   className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
//                 />

//               </div>

//             </div>

//             {/* PASSWORD */}

//             <div>

//               <label className="text-gray-300 text-sm mb-2 block">
//                 Password
//               </label>

//               <div className="flex items-center rounded-xl border border-gray-700 bg-[#0b1320] px-4 h-14 focus-within:border-red-500 transition">

//                 <Lock className="text-gray-500 mr-3" size={20} />

//                 <input
//                 name="password"
//                   type="password"
//                   value={loginData.password}
//                   onChange={onChangeInputHandler} 
//                   placeholder="Enter password"
//                   className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
//                 />

//                 <button
//                   type="button"
//                   onClick={()=>setShowPassword(prev=>!prev)}
//                   className="text-gray-400 hover:text-white transition"
//                 >
//                   {
//                     showPassword
//                       ? <EyeOff size={20} />
//                       : <Eye size={20} />
//                   }
//                 </button>

//               </div>

//             </div>

//             {/* Forgot */}

//             <div className="flex justify-end mt-4">

//               <button className="text-red-500 text-sm hover:text-red-400 transition">
//                 Forgot Password?
//               </button>

//             </div>

//             {/* Login Button */}

//             <button
//               className="mt-8 h-14 w-full rounded-xl bg-red-600 hover:bg-red-500 transition-all duration-300 font-semibold text-white flex items-center justify-center gap-3 shadow-lg shadow-red-700/20"
//               onClick={loginHandler}
//             >
//               Login
//               <ArrowRight size={20} />
//             </button>

//             <div className="mt-10 border-t border-gray-700 pt-5">

//               <p className="text-center text-gray-500 text-sm">
//                 Fitness Beast Gym Management System
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default AdminLoginPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from "../assets/Fitness_Beast_Logo.png";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Clock3,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const responseFromBackend = await axios.post(
        `${backendUrl}/api/admin/auth/login`,
        loginData,
        {
          withCredentials: true,
        }
      );

      if (responseFromBackend.data.success) {
        toast.success("Login Successful");

        navigate("/admin/dashboard");
      } else {
        toast.error(responseFromBackend.data.error);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went Wrong"
      );
    }
  };

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <div className="relative min-h-screen overflow-hidden bg-[#060606]">

  {/* Background */}

  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111111] to-[#050505]" />

  <div className="absolute -top-52 -left-52 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[170px]" />

  <div className="absolute bottom-[-200px] right-[-150px] h-[450px] w-[450px] rounded-full bg-red-500/10 blur-[180px]" />

  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage: `
      linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
  />

  <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

    <div className="grid w-full max-w-7xl lg:grid-cols-2 items-center gap-16">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex flex-col justify-center">

        <img
          src={Logo}
          alt="Logo"
          className="w-40 drop-shadow-[0_0_30px_rgba(239,68,68,.4)]"
        />

        <p className="mt-10 uppercase tracking-[7px] text-red-500 font-semibold">
          Gym Management System
        </p>

        <h1 className="mt-4 text-7xl font-black leading-none text-white">

          FITNESS

          <span className="block text-red-500 mt-2">
            BEAST
          </span>

        </h1>

        <p className="mt-8 max-w-xl text-lg leading-9 text-gray-400">

          Manage memberships, trainers, attendance,
          subscriptions and revenue with one powerful
          administration dashboard built for modern gyms.

        </p>

        {/* Stats */}

        <div className="mt-14 grid grid-cols-3 gap-5">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <p className="text-4xl font-bold text-red-500">
              850+
            </p>

            <p className="mt-2 text-gray-400">
              Members
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <p className="text-4xl font-bold text-red-500">
              40+
            </p>

            <p className="mt-2 text-gray-400">
              Trainers
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <p className="text-4xl font-bold text-red-500">
              24/7
            </p>

            <p className="mt-2 text-gray-400">
              Access
            </p>

          </div>

        </div>

      </div>

      {/* LOGIN CARD */}

      <div className="flex justify-center">

        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,.55)]">

          <div className="flex justify-center">

            <img
              src={Logo}
              alt=""
              className="w-24"
            />

          </div>

          <div className="mt-6 flex justify-center">

            <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400">

              <ShieldCheck size={18} />

              <span className="text-sm font-medium">

                Administrator Portal

              </span>

            </div>

          </div>

          <h2 className="mt-8 text-center text-4xl font-bold text-white">

            Welcome Back

          </h2>

          <p className="mt-3 text-center text-gray-400">

            Sign in to continue

          </p>

          {/* EMAIL */}

          <div className="mt-10">

            <label className="mb-2 block text-sm text-gray-300">

              Email Address

            </label>

            <div className="flex h-14 items-center rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-red-500">

              <Mail className="mr-3 text-red-500" size={19} />

              <input
                name="email"
                type="email"
                value={loginData.email}
                onChange={onChangeInputHandler}
                placeholder="Enter email"
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="mt-6">

            <label className="mb-2 block text-sm text-gray-300">

              Password

            </label>

            <div className="flex h-14 items-center rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-red-500">

              <Lock className="mr-3 text-red-500" size={19} />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={onChangeInputHandler}
                placeholder="Enter password"
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div className="mt-4 flex justify-end">

            <button className="text-sm text-red-400 hover:text-red-300">

              Forgot Password?

            </button>

          </div>

          <button
            onClick={loginHandler}
            className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-red-600 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_15px_35px_rgba(239,68,68,.45)]"
          >
            Login

            <ArrowRight size={20} />

          </button>

          <div className="mt-10 border-t border-white/10 pt-8">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2 text-gray-400">

                  <CalendarDays size={18} />

                  <span>{day}</span>

                </div>

                <p className="mt-2 text-sm text-gray-500">

                  {date}

                </p>

              </div>

              <div className="text-right">

                <div className="flex items-center justify-end gap-2 text-red-500">

                  <Clock3 size={18} />

                  <span className="text-2xl font-bold">

                    {time}

                  </span>

                </div>

              </div>

            </div>

          </div>

          <p className="mt-8 text-center text-xs tracking-widest text-gray-500 uppercase">

            Fitness Beast Management System

          </p>

        </div>

      </div>

    </div>

  </div>
</div>
  );
};

export default AdminLoginPage;