// import React from "react";
// import { useState } from "react";
// import { createContext } from "react";
// import { useContext } from "react";
// import axios from "axios";
// import { useEffect } from "react";


// export const gymAppContext = createContext()

// const gymContextProvider = async({children})=>{

//     axios.defaults.withCredentials=true
//     const backendUrl = process.env.BACKEND_URL
//     const [isLoggedIn,setIsLoggedIn] = useState(false)
//     const [loading,setLoading] = useState(true)
//     const [gymData,setGymData] = useState(null)

//      const fetchGymDetails = async () =>{
//         try {
//                 const {backendResponse} = await axios.get(`${backendUrl}/api/gym/my-gym`, {withCredentials: true} )

//             console.log(backendResponse.gym)
//             if(backendResponse.success){
//                 setIsLoggedIn(true)
//                 setLoading(false)
//                 setGymData(backendResponse.gym)
//             }else{
//                 setIsLoggedIn(false)
//                 setGymData(null)
//             }
//         } catch (error) {
//             console.log(error.message)
//         }
//      }

//      useEffect(()=>{
//     fetchGymDetails()
// },[])

//     const values = {
//         backendUrl,

//         isLoggedIn,
//         setIsLoggedIn,

//         gymData,
//         setGymData,

//         loading
//     }

//     return(
//         <gymAppContext.Provider value={values}>
//             {children}
//         </gymAppContext.Provider>
//     )
// }

// export default gymContextProvider

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const gymAppContext = createContext();

const GymContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [gymData, setGymData] = useState(null);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        const fetchGym = async () => {

            try {

                const { data } = await axios.get(
                    `${backendUrl}/api/gym/my-gym`
                );

                if (data.success) {
                    setGymData(data.gym);
                    setIsLoggedIn(true);
                } else {
                    setGymData(null);
                    setIsLoggedIn(false);
                }

            } catch {

                setGymData(null);
                setIsLoggedIn(false);

            } finally {

                setLoading(false);

            }

        };

        fetchGym();

    }, []);

    return (
        <gymAppContext.Provider
            value={{
                backendUrl,
                isLoggedIn,
                setIsLoggedIn,
                gymData,
                setGymData,
                loading,
            }}
        >
            {children}
        </gymAppContext.Provider>
    );
};

export default GymContextProvider;