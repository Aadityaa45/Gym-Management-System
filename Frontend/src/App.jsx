import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Admin_Pages/Dashboard";
import Layout from "./components/AdminComponents/layout";
import Members from "./Admin_Pages/Members";
const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route  element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/members" element={<Members/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;