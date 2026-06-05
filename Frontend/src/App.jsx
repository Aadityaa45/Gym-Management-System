import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Admin_Pages/Dashboard";
import Layout from "./components/AdminComponents/layout";
const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route  element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;