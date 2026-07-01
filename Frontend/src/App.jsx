// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Dashboard from "./Admin_Pages/Dashboard";
// import Layout from "./components/AdminComponents/layout";
// import Members from "./Admin_Pages/Members";
// import Registration from "./Admin_Pages/Registration";
// import MemberShipPlans from "./Admin_Pages/MembershipPlans";
// import PlanAddForm from "./Admin_Pages/AddPlans";
// import Products from "./Admin_Pages/Products";
// const App = () => {
//   return (
//     <>
//       <Toaster position="top-center" />

//       <Routes>
//         <Route  element={<Layout />}>
//           <Route path="/admin/dashboard" element={<Dashboard />} />
//           <Route path="/admin/members" element={<Members/>}/>
//           <Route path="/admin/registration" element={<Registration/>}/>
//           <Route path="/admin/membership-plans" element = {<MemberShipPlans/>}/>
//           <Route path="/admin/add-plans" element={<PlanAddForm/>}/>
//           <Route path="/admin/products" element={<Products/>}/>
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/AdminComponents/layout";

import Dashboard from "./Admin_Pages/Dashboard";
import Members from "./Admin_Pages/Members";
import Registration from "./Admin_Pages/Registration";
import MemberShipPlans from "./Admin_Pages/MembershipPlans";
import PlanAddForm from "./Admin_Pages/AddPlans";
import Products from "./Admin_Pages/Products";
import AddNewPlan from "./Admin_Pages/NewPlans";


import AdminLoginPage from "./Auth_Pages/loginPage";
import ProtectedAdminRoute from "./components/protectedRoutes";

function App() {

    return (
        <>
            <Toaster position="top-center"/>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/admin/login"
                    element={<AdminLoginPage />}
                />



                {/* Protected Routes */}

                <Route element={<ProtectedAdminRoute />}>

                    <Route element={<Layout />}>

                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/admin/members"
                            element={<Members />}
                        />

                        <Route
                            path="/admin/registration"
                            element={<Registration />}
                        />

                        <Route
                            path="/admin/membership-plans"
                            element={<MemberShipPlans />}
                        />

                        <Route
                            path="/admin/add-plans"
                            element={<PlanAddForm />}
                        />

                        <Route
                            path="/admin/products"
                            element={<Products />}
                        />

                        <Route
                            path="/admin/add-plan"
                            element = {<AddNewPlan/>}
                        />

                    </Route>

                </Route>

            </Routes>
        </>
    );
}

export default App;