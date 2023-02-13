import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import TransactionList from "./pages/transactionsList";
import { isAuthenticated } from "./services/auth";

const Private = (Component) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/" />;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/oi" element={<TransactionList />} />
      <Route path="/signup" element={<h1>SignUp</h1>} />
      <Route path="/dashboard" element={<Private />}>
        <Route element={<TransactionList />} />
        <Route path="import" element={<h1>Importar</h1>} />
        {/* <Route path="settings" element={<SettingsPage />} /> */}
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;