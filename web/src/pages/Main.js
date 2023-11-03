import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import "./Main.css"
import { Link, useLocation, useParams } from "react-router-dom"

import api from "../services/api"

import logo from "../assets/logo.svg"
import like from "../assets/like.svg"
import dislike from "../assets/dislike.svg"
import itsamatch from "../assets/itsamatch.png"

export default function Main() {
  const { userid } = useParams()
  const location = useLocation()
  const loggedUser = location.state.loggedUser

  const [users, setUsers] = useState([])
  const [matchDev, setMatchDev] = useState(null)

  console.log(location.state.loggedUser)

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: userid },
      })

      setUsers(response.data)
    }

    loadUsers()
  }, [userid])

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      query: { user: userid },
    })

    socket.on("match", (dev) => {
      setMatchDev(dev)
    })
  }, [userid])

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: userid },
    })

    setUsers(users.filter((user) => user._id !== id))
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: userid },
    })

    setUsers(users.filter((user) => user._id !== id))
  }

  return (
    <div id="app" style={matchDev && { overflow: "hidden" }}>
      <div className="main-container">
        <Link to="/">
          <img src={logo} alt="Tindev" />
        </Link>

        <div className="avatar-container">
          <strong>{loggedUser.name}</strong>
          <img src={loggedUser.avatar} alt="" />
        </div>

        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <img src={user.avatar} alt={user.name} />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>

                <div className="buttons">
                  <button type="button" onClick={() => handleDislike(user._id)}>
                    <img src={dislike} alt="Dislike" />
                  </button>
                  <button type="button" onClick={() => handleLike(user._id)}>
                    <img src={like} alt="Like" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">Finished 🙁</div>
        )}

        {matchDev && (
          <div className="match-container">
            <img src={itsamatch} alt="It's a match" />
            <img className="avatar" src={matchDev.avatar} alt="Avatar" />
            <strong>{matchDev.name}</strong>
            <p>{matchDev.bio}</p>

            <button type="button" onClick={() => setMatchDev(null)}>
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
