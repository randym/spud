import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export const NavBar = ({ user }) => {
  const logout = () => {
    window.open('/api/v1/auth/logout', '_self')
  }
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Spud
        </Link>
      </span>

      <ul className="list">
        {user ? (
          <>
            <li className="listItem">
              <img src={user.photos[0].value} className="avatar" alt="" />
            </li>
            <li className="listItem">{user.displayName}</li>
            <li className="listItem" onClick={logout}>
              Logout
            </li>
          </>
        ) : (
          <li className="listItem">
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}
