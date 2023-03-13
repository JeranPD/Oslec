import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Tracking from "./components/Tracking";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import {
  AddCustomer,
  AllCustomer,
  AdminProfile,
  SharedLayout,
  Stats,
  Analytics,
  CustomerInfo,
  Records,
  Supplier,
  AddSupplier
} from "./components/Dashboard/";
import ProtectedRoute from "./components/ProtectedRoute.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Stats />} />
        <Route path="all-customer" element={<AllCustomer />} />
        <Route path="add-customer" element={<AddCustomer />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="records" element={<Records />} />
        <Route path="supplier" element={<Supplier />} />
        <Route path="add-supplier" element={<AddSupplier />} />
        <Route path="customer" element={<CustomerInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
