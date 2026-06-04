import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Admin_Pages/Dashboard";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;