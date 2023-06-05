import React from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "../AppRouter/AppRouter";
import AuthProvider from "../AuthProvider/AuthProvider";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
      <AuthProvider />
    </>
  );
}

export default App;
