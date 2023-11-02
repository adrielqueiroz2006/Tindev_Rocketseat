import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Main from "./pages/Main"

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dev/:userid" element={<Main />} />
      </Routes>
    </Router>
  )
}
