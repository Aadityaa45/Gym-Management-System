import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Admin_Pages/Dashboard";
import Layout from "./components/AdminComponents/layout";
import Members from "./Admin_Pages/Members";
import Registration from "./Admin_Pages/Registration";
import MemberShipPlans from "./Admin_Pages/MembershipPlans";
const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route  element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/members" element={<Members/>}/>
          <Route path="/admin/registration" element={<Registration/>}/>
          <Route path="/admin/membership-plans" element = {<MemberShipPlans/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;