import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

import api from "../services/api"

import logo from "../assets/logo.svg"

export default function Login() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await api.post("/devs", { username })

    const { _id } = response.data

    navigate(`/dev/${_id}`)
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Enter your Github user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  )
}
