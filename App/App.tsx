import React from "react";
import { Outlet } from "react-router";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
}
