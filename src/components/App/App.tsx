import React from "react";
import "./App.scss";

import AppRouter from "../AppRouter/AppRouter";
import AuthProvider from "../AuthProvider/AuthProvider";

function App() {
  return (
    <>
      <AppRouter />
      <AuthProvider />
    </>
  );
}

export default App;
