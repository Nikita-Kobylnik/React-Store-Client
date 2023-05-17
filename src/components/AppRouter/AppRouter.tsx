import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Subcategory from "../../pages/Subcategory/Subcategory";
import Autopart from "../../pages/Autopart/Autopart";
import Account from "../../pages/Account/Account";
import AutopartList from "../AutopartList/AutopartList";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/subcategory/:id" element={<Subcategory />} />
      <Route path="/autopart/:id" element={<Autopart />} />
      <Route path="/account/edit" element={<Account />} />
    </Routes>
  );
}

export default AppRouter;
